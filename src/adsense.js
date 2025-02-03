import React, { useEffect } from 'react';


const AdDisplay = ({ slot, format = 'auto', style = {} }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <div style={{ overflow: 'hidden', margin: '20px 0' }}>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    ...style
                }}
               
                data-ad-client="ca-pub-6342305342378595"
                data-ad-slot="2276648312"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdDisplay;