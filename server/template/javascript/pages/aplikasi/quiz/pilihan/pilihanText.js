import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { encode, decode } from 'html-entities';

function PilihanText(props) {    
    const {checked, value, onChange, onChecked,onRemove,disRem} = props;   

    const handleEditorValue = (editorState) => {        
        
        const content = editorState.getCurrentContent();
        const isEditorEmpty = !content.hasText();    
        const lengthOfTrimmedContent = content.getPlainText().trim().length;
        const isContainOnlySpaces = !isEditorEmpty && !lengthOfTrimmedContent;
        if(isEditorEmpty){      
            return onChange("");
        }else if(isContainOnlySpaces){
            return onChange("");
        }else{
            return onChange(encode(convertToHTML(editorState.getCurrentContent())));
        }
    }

    return (
    <div className={"flex flex-column w-100 mb3 " + (props.errorPilihan ? "error":"")} style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>
                <span className={"checkmark " + (props.errorCheck ? "error":"")}></span>
            </label>
            <span>Jawaban Teks</span>
            {disRem ? 
            <span className="pa1 bg-moon-gray"><i className="material-icons gray" style={{fontSize:"20px"}}>close</i></span>
            :
            <span className="dim pointer pa1 bg-red" onClick={onRemove}><i className="material-icons white" style={{fontSize:"20px"}}>close</i></span>
            }
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