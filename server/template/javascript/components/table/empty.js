import React from 'react';

function Empty(props) {
    return (
        <section className="vh-50 dt w-100">
        <div className="dtc v-mid">
        <header className="ph5 flex flex-column justify-center items-center">             
            <span className="dib flex items-center silver f3">
                Data {props.nama} kosong
            </span>
        </header>              
        </div>
      </section> 
    );
}

export default Empty;