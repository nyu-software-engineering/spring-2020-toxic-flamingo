import React, {useState} from 'react';


function ZipForm() {
    const [zipcode, setZip] = useState("");

    const inputUpdated = e => {
        console.log("updating zip");

        const zip = e.target.value;

        setZip(zip);
    }

    return (
        <div className='zip-form'>
            <form>
                <label htmlFor='zipcode'>Zip Code</label>
                <input
                    className='form-control'
                    type='input'
                    name='zipcode'
                    value= {zipcode}
                    onInput= {inputUpdated}/>
                <button type='submit' className='btn btn-success'>Get the forecast!</button>
            </form><br/>
            <p>Current zipcode: {zipcode}</p>
        </div>
    );

}

export default ZipForm;