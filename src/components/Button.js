import React, { Component } from 'react'
import { MdAddCircle } from 'react-icons/md'

function AddButton(props) {
  return (
    <button type='submit' className='btn btn-success btnAdd'>
      <MdAddCircle size={33}>Add {props.name}</MdAddCircle>
    </button>
  )
}

export default AddButton
