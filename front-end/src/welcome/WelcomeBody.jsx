import React from 'react';
import Half from './Half';
import "./WelcomeBody.css";
function WelcomeBody() {
    return (<div>
        <div className='Background'></div>
        <div className='container blocks'>
            <div className='row mr-5 mb-5 ml-5' style={{ marginTop: "80px" }}>
                <div className='col-md'>
                    <Half content={true} />
                </div>
                <div className='col-md'>
                    <Half content={false} />
                </div>
            </div>
        </div>

    </div>);
}

export default WelcomeBody;
