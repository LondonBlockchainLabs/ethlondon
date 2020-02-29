import React, {useMemo, useCallback}  from 'react';
import {useDropzone} from 'react-dropzone';



// styling
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
// dropzone component
export default function Accept(props) {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const reader = new FileReader();
        reader.onload = () => {
            console.log(JSON.parse(reader.result))
        }
        
        reader.readAsBinaryString(acceptedFiles[0]);
    }, [])

    const {
        acceptedFiles, 
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: '.json', onDrop : onDrop});
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    // callback function on drop
    
  
    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
            <h4>Accepted files</h4>
            <ul>
            {acceptedFilesItems}
            </ul>
        </aside>
        </section>
    );
}