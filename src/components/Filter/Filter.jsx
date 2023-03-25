import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Filters } from './Filter.styled';
import { filterContact } from '../../redux/contactsSlice';

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter.value);

    const changeFilter = e => {
        dispatch(filterContact(e.currentTarget.value))
    }

    return(
        <label >Find contact by name
            <Filters type="text" value={filter} onChange={changeFilter}/>
        </label>
    )
}

export default Filter;
