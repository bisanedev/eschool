import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { encode, decode } from 'html-entities';

function PilihanText(props) {    
    const {checked, value, onChange, onChecked,onRemove} = props;   

    const handleEditorValue = (editorState) => {        
        return onChange(encode(convertToHTML(editorState.getCurrentContent())));
    }

    return (
    <div className="flex flex-column w-100 mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>
                <span className="checkmark"></span>
            </label>
            <span>Jawaban Text</span>
            <span className="dim pointer pa1 bg-red" onClick={onRemove}>
                <i className="material-icons white" style={{fontSize:"20px"}}>close</i>
            </span>            
        </div>
        <Editor            
            defaultEditorState={EditorState.createWithContent(convertFromHTML(decode(value)))}
            editorClassName="wysiwyg-editor-small"
            onEditorStateChange={(editorState) => {handleEditorValue(editorState)}}              
            toolbar={{
                options: ['inline','emoji'],
                inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                }
            }}
        />        
    </div>
    );
}

export default PilihanText;