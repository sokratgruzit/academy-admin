import Modal from "./Modal";
import BaseInput from '../UI/BaseInput'
// import BaseSelect from '../UI/BaseSelect';

const CategoriesModal = ({ 
    open,
    onClose, 
    title,
    handleChange,
    handleSubmit
}) => {
    return (
        <Modal open={open} onClose={onClose} title={title}>
            <form className="form-list">
                <BaseInput
                    type="text"
                    id="title"
                    name="title" 
                    defaultValue={''}
                    label="title"
                    placeholder="enter title" 
                    onChange={(e) => handleChange(e, 'title')}
                />
                <button className='btn' onClick={handleSubmit}>submit</button>
            </form>
        </Modal>
    )
}

export default CategoriesModal