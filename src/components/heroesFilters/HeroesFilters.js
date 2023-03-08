import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { fetchFilters, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';

// Task for this component:
// Filters should be generated based on the loaded data
// Filters should only show the right heroes when selected
// Active filter has class active
// It is POSSIBLE to change the json file for convenience!

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    // Request to the server to get filters and change state sequentially
    useEffect(() => {
        //dispatch(filtersFetching());
        dispatch(fetchFilters(request));
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        // I expanded the data in the json-file with classes and text (Данные в json-file я расширил классами и текстом)
        return arr.map(({name, className, label}) => {

            // Using the library classnames and form classes dynamically
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Відфільтрувати героїв за елементами</p>
                <div className="btn-group">
                    {elements} 
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;