import React from 'react'
import { useEffect } from 'react'
import styles from './Modal.module.css'


export default function Modal({show, close}) {


    useEffect(()=>{
        //console.log(`component mounted +${show}`)
        return(
        console.log(`component will unmount +${show}`)
        )
    },[show]);
  return ( show &&
    <>
        <div className={styles.modalDiv + " text-center"} >

            <div className= {styles.modalContent + " w-50 mx-auto my-4 bg-white rounded-3"}>
                <div >
                    <i className={styles.modalIcon +" rounded-circle bg-warning me-0 my-2 fa-solid fa-close p-2"} onClick={close}></i>
                </div>
                    <h3 className="text-center text-danger">Warning</h3>
                    <p className='text-center p-2'> you can't add empty Note</p>

            </div>
        </div>
    </>
      )
}
