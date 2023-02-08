import { useState, useContext, useEffect } from "react";
import CategoriesModal from "../../../modals/CategoriesModal";
import { AuthContext } from "../../../../context/AuthContext";
import { useHttp } from "../../../../hooks/http.hook";

// styles
import styles from './Categories.module.css';

function Categories() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
    });
    const [edit, setEdit] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const { token } = useContext(AuthContext);
    const { request } = useHttp();

    useEffect(() => {
        request('/api/content/' + 'category', 'GET', null, {
            Authorization: `Bearer ${token}`
        }).then((res) => setData(res))
    }, []);

    console.log(formData);

    const handleChange = (e, name) => {
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await request('/api/content/category', edit ? 'PUT' : 'POST', formData, {
            Authorization: `Bearer ${token}`
        });
    };

 
    // const removeHandler = async () => {
    //    const result = await request('/api/content/' + 'category' + '/' + 'category', 'delete', null, {
    //       Authorization: `Bearer ${token}`
    //    });
 
    //    getTaxonomies('category');
    // }
 
    return (
        <>
            <div>
                <div className={styles.categoriesHeader}>
                    <h2>Categories</h2>
                    <button onClick={() => {
                        setModalActive(!modalActive);
                        setEdit(false);
                    }}>Add Category</button>
                </div>

                <div className={styles.categoriesList}>
                    {data?.map((item) => {
                        return (
                            <div className={styles.categoriesListItem} key={item._id}>
                                <span>{item.slug}</span>
                                <div className={styles.categoriesButtons}>
                                    <button onClick={() => {
                                        console.log(item);
                                        setEdit(true);
                                        setModalActive(true);
                                    }}>Edit</button>
                                    <button onClick={() => console.log(item._id)}>Remove</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <CategoriesModal
                open={modalActive}
                onClose={() => setModalActive(false)}
                title={edit ? 'Edit Category' : 'Add New Category'}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                // edit={edit}
            />
     </>
    );
}

export default Categories;