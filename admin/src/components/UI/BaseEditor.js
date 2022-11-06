import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'


function BaseEditor({ data = '', id = 'editor1', setMyEditor }) {

   return (
      <CKEditor
         editor={Editor}
         data={data}
         id={id}
         onReady={editor => {
            setMyEditor(editor);
         }}
      />
   )
}

export default BaseEditor;