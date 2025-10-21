import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({name, control, label, defaultValue = ''}) => {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
        {label}</label>
        }

        <Controller
         name={name || 'content'}
        control={control} 
        render = {({field: {onChange, value}}) => {
            return(
                <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                initialValue={defaultValue}
                init = {{
                    height: 500,
                    menubar: true,
                    // Removed deprecated/missing plugins (print, paste). Paste is built-in from TinyMCE 6+.
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                      'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | outdent indent | ' +
                    'table | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                value={value}
                onEditorChange={onChange}
                 />
            )

        }}
          />
      
    </div>
  )
}

export default RTE
