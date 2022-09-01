import { useContext, useState, useRef } from 'react';
import ReactDom from 'react-dom'
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Select from 'react-select'
import Modal from './Modal';
import BaseInput from '../UI/BaseInput'
import BaseSelect from '../UI/BaseSelect';


function GlossaryModal({ open = false, onClose, glossary, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [characters, setCharacters] = useState([
      {
         value: "#",
         label: "#"
      },
      {
         value: "A",
         label: "A"
      },
      {
         value: "B",
         label: "B"
      },
      {
         value: "C",
         label: "C"
      },
      {
         value: "D",
         label: "D"
      },
      {
         value: "E",
         label: "E"
      },
      {
         value: "F",
         label: "F"
      },
      {
         value: "G",
         label: "G"
      },
      {
         value: "H",
         label: "H"
      },
      {
         value: "I",
         label: "I"
      },
      {
         value: "J",
         label: "J"
      },
      {
         value: "K",
         label: "K"
      },
      {
         value: "L",
         label: "L"
      },
      {
         value: "M",
         label: "M"
      },
      {
         value: "N",
         label: "N"
      },
      {
         value: "O",
         label: "O"
      },
      {
         value: "P",
         label: "P"
      },
      {
         value: "Q",
         label: "Q"
      },
      {
         value: "R",
         label: "R"
      },
      {
         value: "S",
         label: "S"
      },
      {
         value: "T",
         label: "T"
      },
      {
         value: "U",
         label: "U"
      },
      {
         value: "V",
         label: "V"
      },
      {
         value: "W",
         label: "W"
      },
      {
         value: "X",
         label: "X"
      },
      {
         value: "Y",
         label: "Y"
      },
      {
         value: "Z",
         label: "Z"
      }
   ]);



   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: '',
         teaser: '',
         inner_text: '',
         character: ''
      };
      formData.title = e.target.title.value;
      formData.teaser = e.target.teaser.value;
      formData.inner_text = e.target.title.value;
      formData.character = e.target.character.value || null;



      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/glossaries' : '/api/content/glossaries/' + glossary.slug;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   return (
      <Modal open={open} onClose={onClose} title="Glossary">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={glossary.title}
               label="title"
               placeholder="enter title" />

            <BaseSelect
               name="character"
               placeholder='choose character'
               options={characters}
               defaultValue={glossary.character ? {
                  value: glossary.character,
                  label: glossary.character
               } : ''}
            />

            <BaseInput
               type="text"
               id="teaser"
               name="teaser" defaultValue={glossary.teaser}
               label="teaser"
               placeholder="enter teaser" />

            <BaseInput
               type="text"
               id="inner_text"
               name="inner_text" defaultValue={glossary.inner_text}
               label="inner text"
               placeholder="enter inner text" />


            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )

}

export default GlossaryModal;