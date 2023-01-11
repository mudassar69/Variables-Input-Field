import { MentionsInput, Mention } from 'react-mentions';
import { useState,useRef } from 'react';
import MentionInputStyles from '../../styles/MentionInputStyles';
import MentionStyles from '../../styles/MentionStyles';


const Textbox=()=>{

    const inputRef=useRef(null);
    const divRef= useRef(null);

    const [value,setValue]=useState('');
    const [users,setUsers]=useState([{id: 1,display: 'Hyder'},{id: 2,display: 'Bilal'},{id: 3,display: 'Ali'},{id: 4,display: 'Moiz'}])
    const [tags,setTags]= useState([]);

    const handleChange=(event,n,p,q)=>{
        // event.preventDefault();
        // setValue(event.target.value);
        // console.log(inputRef.current.selectionStart);
        setValue(n);
        
    }



    const append=(tagText)=>{
        console.log('current: ',inputRef.current)
        console.log('VALUE LENGTH: ',value.length)
        const i=inputRef.current.selectionStart;
        const length= tags.filter((e)=>e.end<=i).length;//no. of tags before the cursor
        console.log('LENGTH: ',length);
        const extraSpaces= length*6;

        console.log('index: ',i, "before: ",value.substring(0, i), "after: ",value.substring(i+1))
        let x = value.substring(0, i+extraSpaces) + ' ' + `@[${tagText.display}](${tagText.id})` + value.substring(i+extraSpaces+1);
        setValue(x)
        inputRef.current.setSelectionRange(i+tagText.length+1,0);
        console.log(x.length)
        
        
    }

    

    const addTag=(taggedUser)=>{
        const taggedUsersList= tags;
        taggedUsersList.push({id: taggedUser.id, display: taggedUser.display, start: inputRef.current.selectionStart, end: inputRef.current.selectionStart+taggedUser.display.length-1});
        console.log(taggedUsersList);
        setTags(taggedUsersList);
        append(taggedUser)
        // setValue(value + `@[${taggedUser.display}](${taggedUser.id})`)
    }

    const removeTag=()=>{

    }

    // const handleKeyDown=(event)=>{
    //     if(event.keyCode === 8){
    //         tags.forEach((value1,index)=>{
    //             if(value1.end === inputRef.current.selectionStart-1){
    //                 value.sub
    //             }
    //         })
    //     }
    //     else if(event.keyCode== 46){

    //     }
        
    // }

    return(
        <div>
            <MentionsInput
                style={MentionInputStyles}
                markup="@[__display__](__id__)"
                value={value}
                onChange={handleChange}
                inputRef={inputRef}
                >
                <Mention trigger="@" data={users} style={MentionStyles}/>
            </MentionsInput>
            {/* <div id="input-text" ref={divRef}>
                <input value={value} onChange={handleChange} ref={inputRef}>
               
               </input>
               
             </div>*/}
            
            <div>{
                users.map((value,index)=><button key={index} onClick={()=>addTag(value)}>{value.display}</button>)
                }
            </div> 
        </div>
       
    )
}

export default Textbox;

 