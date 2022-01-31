import React from 'react';
import './Style.css';
import Filter from './Filter';
import SearchBar from './SearchBar';
import SearchBarButton from './SearchBarButton';

const index = (props) => {
    return (
        <div className="flex-items-between white p-2 m-0 subnav-container">
            {
                props.showFilter 
                ? (
                    <Filter
                        option={props.option}
                        onSelectChange={props.onSelectChange} 
                        filterName={props.filterName} 
                        filterList={props.filterList}
                    />
                )
                : null
            }
            {
                props.showSearch
                ? (
                    <SearchBar 
                        searchInput={props.searchInput}
                        onChangeInput={props.onChangeInput}
                        searchPlaceholder={props.searchPlaceholder}
                        ariaLabel={props.ariaLabel}
                        ariaDescription={props.ariaDescription}
                        onSearch={props.onSearch}
                        searchID={props.searchID}
                    />
                )
                : null
            }
            {
                props.showButton
                ? (
                    <SearchBarButton 
                        onAddItem={props.onAddItem} 
                        buttonTitle={props.buttonTitle} 
                    />
                )
                : <div style={{width: '30%'}} />
            }
            {
                props.showField
                ? (
                    props.onShowField
                )
                : null
            }
        </div>
    )
}

export default index;