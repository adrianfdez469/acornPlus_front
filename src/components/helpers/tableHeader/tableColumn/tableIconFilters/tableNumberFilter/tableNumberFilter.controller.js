import React, { useState, useEffect} from 'react';
import TableNumberFilterView from './tableNumberFilter.view';

const TableNumberFilter = (props) => {

    const { setFilter, disableFilter} = props;

    const [searchCheck, setSearchCheck] = useState(false);
    const [GTsearchCheck, GTsetSearchCheck] = useState(false);
    const [LTsearchCheck, LTsetSearchCheck] = useState(false);

    const [searchState, setSearchState] = useState('');
    const [GTsearchState, GTsetSearchState] = useState('');
    const [LTsearchState, LTsetSearchState] = useState('');

    const [delayTimer, setDelayTimer] = useState(null); 
     
    useEffect(() => {
        if(disableFilter === true){
            setSearchCheck(false);
            GTsetSearchCheck(false);
            LTsetSearchCheck(false);
        }
    }, [disableFilter]);

    const onChangeSearchField = (event) => {
        setSearchState(event.target.value);
        clearTimeout(delayTimer);
        setDelayTimer(setTimeout((value) => {
            GTsetSearchCheck(false);
            LTsetSearchCheck(false);
            if(value !== '')
                setFilter(value);
            else
                setFilter();
        },1000, event.target.value));
        if(event.target.value !== ''){
            setSearchCheck(true);
        }else{
            setSearchCheck(false);
        }        
    }

    const GTonChangeSearchField = (event) => {
        GTsetSearchState(event.target.value);
        clearTimeout(delayTimer);
        setDelayTimer(setTimeout((value) => {
            setSearchCheck(false);
            const valueFilters = [];
            if(LTsearchCheck){
                valueFilters.push({op: '<', valor: LTsearchState});
            }
            if(value !== '')
                valueFilters.push({op: '>', valor: value});
            if(valueFilters.length > 0)
                setFilter(valueFilters);
            else
                setFilter();
        },1000, event.target.value));
        if(event.target.value !== ''){
            GTsetSearchCheck(true);
        }else{
            GTsetSearchCheck(false);
        }        
    }

    const LTonChangeSearchField = (event) => {
        LTsetSearchState(event.target.value);
        clearTimeout(delayTimer);
        setDelayTimer(setTimeout((value) => {
                
            setSearchCheck(false);
            const valueFilters = [];
            if(GTsearchCheck){
                valueFilters.push({op: '>', valor: GTsearchState});
            }
            if(value !== '')
                valueFilters.push({op: '<', valor: value});
            if(valueFilters.length > 0)
                setFilter(valueFilters);
            else
                setFilter();
        },1000, event.target.value));
        if(event.target.value !== ''){
            LTsetSearchCheck(true);
        }else{
            LTsetSearchCheck(false);
        }        
    }

    const onChangeCheck = (event) => {
        setSearchCheck(state => !state);
        if(event.target.checked){
            GTsetSearchCheck(false);
            LTsetSearchCheck(false);
            setFilter(searchState);
        }else{
            setFilter();
        }
    }

    const GTonChangeCheck = (event) => {
        GTsetSearchCheck(state => !state);
        if(event.target.checked){
            setSearchCheck(false);
            const valueFilters = [];
            if(LTsearchCheck){
                valueFilters.push({op: '<', valor: LTsearchState});
            }
            valueFilters.push({op: '>', valor: GTsearchState});
            setFilter(valueFilters);
        }else{
            const valueFilters = [];
            if(LTsearchCheck){
                valueFilters.push({op: '<', valor: LTsearchState});
            }
            if(valueFilters.length > 0)
                setFilter(valueFilters);
            else
                setFilter();
        }
    }

    const LTonChangeCheck = (event) => {
        LTsetSearchCheck(state => !state);
        if(event.target.checked){
            setSearchCheck(false);
            const valueFilters = [];
            if(GTsearchCheck){
                valueFilters.push({op: '>', valor: GTsearchState});
            }
            valueFilters.push({op: '<', valor: LTsearchState});
            setFilter(valueFilters);
        }else{
            const valueFilters = [];
            if(GTsearchCheck){
                valueFilters.push({op: '>', valor: GTsearchState});
            }
            
            if(valueFilters.length > 0)
                setFilter(valueFilters);
            else
                setFilter();
        }
    }



    return (
        <TableNumberFilterView 
        
            {...props}

            GTsearchCheck={GTsearchCheck}
            GTonChangeSearchField={GTonChangeSearchField}
            GTonChangeCheck={GTonChangeCheck}
            GTsearchState={GTsearchState}

            LTsearchCheck={LTsearchCheck}
            LTonChangeSearchField={LTonChangeSearchField}
            LTonChangeCheck={LTonChangeCheck}
            LTsearchState={LTsearchState}

            searchCheck={searchCheck}
            onChangeSearchField={onChangeSearchField}
            onChangeCheck={onChangeCheck}
            searchState={searchState}

        />
    );
}

export default TableNumberFilter;