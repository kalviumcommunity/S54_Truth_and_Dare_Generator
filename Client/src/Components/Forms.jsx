import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = ({ handleCloseModal }) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const FormSubmitHandler = (data) => {
        toast("Submitted Successfully", { theme: "light" });
        console.log(data);

        const postTD = async () => {
            try {
                let res = await axios.post('https://truth-and-dare-generator.onrender.com/td', data);
                console.log(data)
                //   redirect("/stunt")
                console.log(res)
                console.log('TD posted successfully!');
            } catch (err) {
                console.error('Error posting TD:', err);
            }
        };
        postTD()
    };

    return (
        <div className='form-container'>
            <ToastContainer />
            <fieldset>
                <form onSubmit={handleSubmit(FormSubmitHandler)}>
                    <h3>Text : </h3>
                    <input type="text" name='Text' {...register("text", {
                        required: "Fill the Text",
                        minLength: { value: 6, message: "Your text is too short" },
                        maxLength: { value: 90, message: "Maximum 90 chars only" }
                    })} />
                    <p className='err'>{errors.text?.message} </p>

                    <h3>Type : </h3>
                    <div style={{ padding: "3px", display: "flex", justifyContent: "space-around", color: "white" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" {...register("type", { required: "Select Type" })} value="Truth" />
                            <h4>Truth</h4>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" {...register("type", { required: "Select Type" })} value="Dare" />
                            <h4>Dare</h4>
                        </div>
                    </div>
                    <p className='err'>{errors.type?.message} </p>

                    <h3>Category : </h3>
                    <select {...register("category", { required: "Select a Category" })} style={{ height: '2vmax', fontSize: "1vmax" }} >
                        <option value="">Select Category</option>
                        <option value="Classic">Classic</option>
                        <option value="Teens">Teens</option>
                        <option value="Party">Party</option>
                        <option value="Mixed">Mixed</option>
                    </select>
                    <p className='err'>{errors.category?.message} </p>

                    <input type="submit" value={"Submit"} onClick={() => {
                        setTimeout(handleCloseModal, 1300);
                    }} />
                </form>
            </fieldset>
        </div>
    );
};

export default Forms;
