const mongoose = require("mongoose");
const Artist = require("../Models/user/ArtistModel");
const { getArtistById } = require("../Repositories/ArtistRepository");
const { uploadCover } = require("./CloudinaryService");
const {
  createAccount,
  createAccountLink,
  retrieveAccount,
} = require("./StripeAccnt");
const { getUserById } = require("./UserService");

const addAnArtist = async (user) => {
  let stripe_account = await createAccount(user.id);
  const stripe_account_link = await createAccountLink(
    stripe_account.id,
    user.id
  );
  console.log(stripe_account_link);
  stripe_account = await retrieveAccount(stripe_account.id);
  const artist = new Artist({
    user_id: user.id,
    artist_name: user.name.f_name + " " + user.name.l_name,
    bio: user.bio,
    follower_cunt: 0,
    stripe_account_id: stripe_account.id,
    stripe_account_enabled: stripe_account.charges_enabled,
  });

  const savedArtist = await artist.save();

  return { ...savedArtist, url: stripe_account_link.url };
};

const addAProduct = async (artist, product_id) => {
  artist.products.push(product_id);
  try {
    const savedArtist = await artist.save();
    return savedArtist;
  } catch (error) {
    console.log(error);
  }
};

const activate_stripe = async (user_id) => {
  const artist = await ArtistRepository.getArtistByID(user_id);
  const account = await retrieveAccount(artist.stripe_accnt);
  const account_link = await createAccountLink(account, artist.id);
  return account_link;
};
const getAccountByStripeAccountId = async (stripe_id) => {
  const artist = await Artist.findOne({ stripe_account_id: stripe_id });
  return artist;
};

const markAccountEnabled = async (artist) => {
  artist.stripe_account_enabled = true;
  return await artist.save();
};

const updateArtist = async (artistBody, user_id) => {
  const artist = await getArtistById(user_id);

  artist.socials = artistBody.socials;
  artist.bio = artistBody.bio;

  console.log(typeof artist);
  const savedArtist = await artist.save();
  return savedArtist;
};

const setCoverPic = async (image, user_id) => {
  const uploadResponse = await uploadCover(image, user_id);
  const user = await getArtistById(user_id);
  user.cover_url = uploadResponse.secure_url;
  await user.save();
  return uploadResponse;
};

const getArtistPorfile = async (artist_id) => {
  const user = await getUserById(artist_id);
  const artist = await getArtistById(artist_id);
  const followers = artist.followers;
  let following_status = false;
  if (followers.find((el) => el.equals(user.id))) following_status = true;

  const profile = {
    artist_name: artist.artist_name,
    bio: artist.bio,
    follower_count: artist.follower_count,
    socials: artist.socials,
    following_status,
    pfp_url: user.pfp_url,
    cover_url: artist.cover_url,
  };

  return profile;
};

module.exports = {
  addAnArtist,
  addAProduct,
  getAccountByStripeAccountId,
  markAccountEnabled,
  activate_stripe,
  updateArtist,
  setCoverPic,
  getArtistPorfile,
};
