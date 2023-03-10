import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
//import { createSelector } from '@reduxjs/toolkit';

//import { fetchHeroes } from '../../actions';
import {heroDeleted, fetchHeroes, filterHeroesSelector} from './heroesSlice';


import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Task for this component:
// When clicking on the "cross", the character is removed from the general state
// Complicated task:
// Deletion also comes from the json file using the DELETE method

const HeroesList = () => {

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // })

    const filteredHeroes = useSelector(filterHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        //dispatch(heroesFetching());
        //dispatch(fetchHeroes(request));
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);

    // The function takes an id and removes an unnecessary character from the store 
     // ONLY if the delete request was successful
     // Track the action chain actions => reducers
     const onDelete = useCallback((id) => {
        // Deleting a character by to id
        
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line
     }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">?????????????? ????????????????????????</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">???????????? ???????? ????????</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup>
            <ul>
                {elements}
            </ul>
        </TransitionGroup>
    )
}

export default HeroesList;

