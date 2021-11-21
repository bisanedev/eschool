import React from 'react';

function MenuLoading(props) {
    return (
    <section className="vh-50 dt w-100">
        <div className="dtc v-mid">
        <header className="ph5 flex flex-column justify-center items-center"> 
            <div className="loader mb3"></div>
            <span className="dib flex items-center">
                Memuat data {props.nama}
            </span>
        </header>              
        </div>
    </section> 
    );
}

export default MenuLoading;