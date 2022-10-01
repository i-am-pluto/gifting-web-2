const mongoose = require("mongoose");
const Products = require("../Models/product/ProductModel");
const ReviewSchema = require("../Models/product/ReviewSchema");
const {
    getArtistByID,
    getArtistById,
} = require("../Repositories/ArtistRepository");
const { getCategoryById } = require("../Repositories/CategoryRepository");
const productRepository = require("../Repositories/ProductRepository");
const reviewRepository = require("../Repositories/reviewRepository");
const { createProductObject, createPriceObject } = require("./StripeAccnt");
const artistService = require("./ArtistService");
const {
    uploadProductMainImage,
    uploadProductImages,
    deleteProductImage,
} = require("./CloudinaryService");
//get a product
const getAProduct = async(id) => {
    let product = await productRepository.getProductById(id);
    if (product.reviews)
        product.reviews.sort((a, b) => {
            if (a.upvotes < b.upvotes) {
                return -1;
            }
            if (a.upvotes > b.upvotes) {
                return 1;
            }
            return 0;
        });
    await visitProduct(product);
    return product;
};

// build the home page
const getHomeSlider = async() => {
    let homeSLider = await productRepository.getProductsByClicks(0);
    return homeSLider.slice(0, 10);
};

const getMostSelling = async() => {
    let products = await productRepository.getProductsBySold(0);
    return products.slice(0, 20);
};
const getMostPopular = async() => {
    let homeSLider = await productRepository.getProductsByClicks(0);
    return homeSLider.slice(10, 30);
};

// register a product
const addAProduct = async(jsonObject, user_id) => {
    const tempCat = jsonObject.categories;
    const categories = new Array();
    const artist = await getArtistById(user_id);

    if (tempCat) {
        for (var i = 0; i < tempCat.length; i++) {
            const category = await getCategoryById(tempCat[i]);
            categories.push({
                cat_id: category.id,
                cat_name: category.cat_name,
            });
        }
    }

    const product = new Products({
        product_name: jsonObject.product_name,
        categories: categories,

        // images  { to be added}

        artist: {
            artist_name: artist.artist_name,
            artist_followers: artist.follower_count,
            artist_id: mongoose.Types.ObjectId(artist.user_id),
        },
        description: jsonObject.description,
        clicks: 0,
        sold_no: 0,
        description: jsonObject.description,
        info1: jsonObject.info1,
        info2: jsonObject.info2,
        informationTable: {
            itemWeight: jsonObject.itemWeight,
            packageDimension: jsonObject.packageDimension,
            manufacture: jsonObject.manufacture,
        },
        customization: jsonObject.customization,
        customization_optional: jsonObject.customization_optional,
    });

    const stripe_account = artist.stripe_account_id;

    const stripe_product = await createProductObject(product, stripe_account);

    // add product to artist ki id

    product.stripe_product_id = stripe_product.id;

    try {
        const savedProduct = await productRepository.addAProduct(product);
        await artistService.addAProduct(
            artist,
            mongoose.mongo.ObjectId(product.id)
        );

        return savedProduct;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// add varients
const addVarients = async(varients, product_id, artist_id) => {
    const product = await productRepository.getProductById(product_id);
    const artist = await getArtistById(artist_id);
    let saveVarients = [];
    console.log(varients);
    for (var i = 0; i < varients.length; i++) {
        const varient_name = varients[i].varient_name;
        const varient_price = varients[i].varient_price;
        const varient_stocks = varients[i].varient_stocks;
        const stripePriceObject = await createPriceObject(
            product,
            artist.stripe_account_id,
            varient_price
        );
        const varient_stripe_id = stripePriceObject.id;
        saveVarients.push({
            varient_name,
            varient_price,
            varient_stocks,
            varient_stripe_id,
        });
    }

    product.varients = saveVarients;

    console.log(saveVarients);

    const savedProduct = await product.save();
    return savedProduct;
};

// edit varients

// delete varients

// add main image
const addMainImage = async(imageFile, product_id, user_id) => {
    const savedImageUrl = await uploadProductMainImage(
        imageFile,
        user_id,
        product_id
    );
    const product = await productRepository.getProductById(product_id);
    product.main_image_url = savedImageUrl;
    const savedProduct = await product.save();
    return savedProduct;
};

const addAGiftImage = async(imageFile, user_id, product_id) => {
    const product = await productRepository.getProductById(product_id);
    const index = product.gift_image_urls.length;
    const savedImageUrl = await uploadProductImages(
        imageFile,
        user_id,
        product_id,
        index
    );
    product.gift_image_urls.push(savedImageUrl.secure_url);
    const savedProduct = await product.save();
    return savedProduct;
};

// const deleteALLImages
const deleteAllImages = async(user_id, product_id) => {
    const product = await productRepository.getProductById(product_id);
    if (!product.gift_image_urls) return true;
    const gift_images = product.gift_image_urls;
    for (var i = 0; i < gift_images.length; i++) {
        const response = await deleteProductImage(product_id, index);
        if (response.result !== "ok") {
            return false;
        }
    }
    product.gift_image_urls.clear();
    await product.save();
    return true;
};

// edit a particular gift image
// find previous image index
// edit the image
// if new image i.e. replacing no image then push

//add review
const addReview = async(user_id, product_id, comment) => {
    if (ReviewSchema.findOne({ user_id: user_id })) {
        return null;
    }

    const review = new ReviewSchema({
        rating: comment.rating,
        comment: comment.comment,
        user_id: user_id,
        upvotes: 0,
    });
    const savedReview = await reviewRepository.addAReview();
    return savedReview;
};
const upvoteReview = async(user_id, review_id) => {
    const review = await reviewRepository.getReview(review_id);
    review.upvoted_by.array.forEach((element) => {
        if (element === user_id) {
            return null;
        }
    });
    review.upvotes++;
    review.upvoted_by.push(user_id);
    const savedReview = await review.save();
    return savedReview;
};
const downvoteReview = async(user_id, review_id) => {
    const review = await reviewRepository.getReview(review_id);
    review.upvoted_by.array.forEach(async(element, i) => {
        if (element === user_id) {
            review.upvotes--;
            review.upvoted_by.splice(i, 1);
            const savedReview = await review.save();
            return savedReview;
        }
    });
    return null;
};
// delete a product
const deleteAProduct = async(product_id) => {
    await productRepository.deleteAProduct(product_id);
};
// update a product
const visitProduct = async(product) => {
    product.clicks++;
    const savedProduct = await productRepository.updateAProduct(product);
    return savedProduct;
};
const updateAProduct = async(jsonObject) => {
    const product = await getAProduct(mongoose.Types.ObjectId(jsonObject.id));
    const categories = new Array();
    if (tempCat)
        for (var i = 0; i < tempCat.length; i++) {
            const category = await getCategoryById(tempCat[i]);
            categories.push({
                cat_id: category.id,
                cat_name: category.cat_name,
            });
        }
    product.product_name = jsonObject.product_name;
    product.categories = categories;
    // images  { to be added}
    product.price = jsonObject.price;
    product.count_in_stock = jsonObject.count_in_stock;
    product.description = jsonObject.description;
    const updatedProduct = await productRepository.updateAProduct(product);
    return updatedProduct;
};
// build similar products
const getSimilarProducts = async(q, pge_no) => {};
// build search results
const getSearchResults = async(q, pge_no) => {};
// build recommended products
const getRecommended = async(user_id) => {};

module.exports = {
    getAProduct,
    getRecommended,
    getHomeSlider,
    getMostPopular,
    getMostSelling,
    getSearchResults,
    updateAProduct,
    getSimilarProducts,
    addAProduct,
    upvoteReview,
    downvoteReview,
    addVarients,
    addMainImage,
    addAGiftImage,
    deleteAllImages,
};