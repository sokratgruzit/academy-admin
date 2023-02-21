import { useState, useContext, useEffect } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import { AuthContext } from "../../../../context/AuthContext";

import CategoriesModal from "../../../modals/CategoriesModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// styles
import styles from './Tags.module.css';

const defaultFormData = {
    title: '',
    id: ''
};

const Tags = () => {
    const [itemList, setItemList] = useState([]);
    const [formData, setFormData] = useState(defaultFormData);
    const [edit, setEdit] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const { token } = useContext(AuthContext);
    const { request } = useHttp();

    useEffect(() => {
        request('/api/content/' + 'tag', 'GET', null, {
            Authorization: `Bearer ${token}`
        }).then((res) => {
            setItemList(res);
        })
    }, []);

    useEffect(() => {
        console.log('list changed')
    }, [itemList])

    const handleClose = () => {
        setModalActive(false);
        setFormData(defaultFormData);
    };

    const handleModalInputChange = (e, name) => {
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        await request(`/api/content/tag${edit ? '/' + formData.id : ''}`, edit ? 'PUT' : 'POST', { title: formData.title }, {
            Authorization: `Bearer ${token}`
        });
        handleClose();
    };
 
    const handleRemove = async (id) => {
       await request(`/api/content/tag/${id}`, 'delete', null, {
          Authorization: `Bearer ${token}`
       });
    };

    const handleEdit = (item) => {
        setFormData({ id: item._id, title: item.slug });
        setEdit(true);
        setModalActive(true);
    };

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setItemList(updatedList);
    };
 
    return (
        <>
            <div>
                <div className={styles.categoriesHeader}>
                    <h2>Tags</h2>
                    <button onClick={() => {
                        setModalActive(!modalActive);
                        setEdit(false);
                    }}>Add Tag</button>
                </div>

                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="draggable-list">
                        {(provided) => ( 
                            <div 
                                className={styles.categoriesList}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {itemList?.map((item, index) => (
                                    <Draggable 
                                        key={item.slug} 
                                          draggableId={item.slug} 
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div 
                                                className={styles.categoriesListItem} 
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <span>{item.slug}</span>
                                                <div className={styles.categoriesButtons}>
                                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                                    <button onClick={() => handleRemove(item._id)}>Remove</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <CategoriesModal
                open={modalActive}
                onClose={handleClose}
                title={edit ? 'Edit Tag' : 'Add New Tag'}
                handleChange={handleModalInputChange}
                handleSubmit={handleModalSubmit}
                formData={formData}
            />
     </>
    );
};

export default Tags;