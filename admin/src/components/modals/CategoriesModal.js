import { useState } from "react";

import Modal from "./Modal";
import BaseInput from '../UI/BaseInput'
import BaseSelect from '../UI/BaseSelect';
// import ImageUpload from '../UI/ImageUpload';

const CategoriesModal = ({ 
    open,
    onClose, 
    title,
    handleSubmit,
    formData,
}) => {
    return (
        <Modal open={open} onClose={onClose} title={title}>
            <form className="form-list" onSubmit={handleSubmit}>
                <BaseInput
                    type="text"
                    id="title"
                    name="title" 
                    defaultValue={formData.title}
                    label="title"
                    placeholder="enter title" 
                />
                <BaseSelect
                    id="active"
                    name="active"
                    placeholder='set active'
                    options={[{ value: true, label: 'active'}, { value: false, label: 'inactive' }]}
                    defaultValue={{ value: formData.active, label: `${formData.active ? 'active' : 'inactive'}`}}
                />
                <input type='file' />
                <button className='btn'>submit</button>
            </form>
        </Modal>
    )
}

export default CategoriesModal