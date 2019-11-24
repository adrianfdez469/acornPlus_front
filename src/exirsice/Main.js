import React, { useState, useReducer } from 'react';

import Header from './components/Heder';
import Body from './components/Body';
import Footer from './components/Footer';



import {
   muscles as musclesData,
   exercises as exercisesData
} from './components/store/store';

import {exercisesContext, musclesContext, selectedMuscleInTab, selectedTheme} from './components/store/contexts';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const themeDark = createMuiTheme({
    palette: {
        //type: 'dark',
        primary: {
            main: '#8BC34A',
            //light: '#DCEDC8',
            //dark: '#689F38',
            //contrastText: '#212121'
        },
        secondary: {
            main: '#FF5722',
            //light: '#DCEDC8',
            //dark: '#689F38',
            //contrastText: '#212121'
        },
        /*text: {
            primary: "#212121",
            secondary: "757575",
            disabled: "BDBDBD"
            //hint: "rgba(0, 0, 0, 0.38)"
        }*/
    }
});
const themes = {
    dark: () => themeDark,
    light: () => createMuiTheme()
};

const saveExercise = (exerciseState, exercise) => {
    if(exercise.id){
        
        const indexExc = exerciseState.findIndex(exc => exc.id === exercise.id);
        const newExc = [...exerciseState];
        newExc[indexExc] = exercise;
        return newExc;
    }else{
        exercise.id = exercise.title.trimLeft().trimRight().toLowerCase().replace(' ', '-');
        return [...exerciseState, exercise];
    }
}
const deleteExercise = (exerciseState, exerciseId) => {
    const newEsxercises = exerciseState.filter(exc => exc.id !== exerciseId);
    return newEsxercises;
}
const exerciseReducer = (state, action) => {
    switch(action.type){
        case 'save': return saveExercise(state, action.exercise);
        case 'delete': return deleteExercise(state, action.exerciseId);
        default: return state;
    }
}



const Exercise = (props) => {

    const [exercises, dispatchExercises] = useReducer(exerciseReducer, exercisesData);
    const [muscles] = useState(['All', ...musclesData]);
    const [selectedMuscle , setSelectedMuscle] = useState('All');
    const [themeName, changeThemeName] = useState('light');
    

    const onChangeSelectedMuscle = (muscle) => {
        setSelectedMuscle(muscle);
    }

    const getExercisesGroupedByMuscles = () => {
        const obj = exercises
            .reduce((acumulator, currentExercise) => {
                const currentMuscle = currentExercise.muscle;
                acumulator[currentMuscle] = (acumulator[currentMuscle])
                    ? [...acumulator[currentMuscle], currentExercise]
                    : [currentExercise];
                return acumulator;
            }, {});
            return Object.entries(obj);
    }
    
    return (
        <MuiThemeProvider theme={themes[themeName]()}>
            <selectedTheme.Provider value={[themeName, changeThemeName]}>
                <Header />
            </selectedTheme.Provider>
            
            <musclesContext.Provider value={muscles}>
            <selectedMuscleInTab.Provider value={selectedMuscle}>
            <exercisesContext.Provider value={exercises}>
                <Body 
                    grupedExercises={getExercisesGroupedByMuscles()}
                    selectedMuscle={selectedMuscle}
                    exerciseAction={dispatchExercises}
                />
            </exercisesContext.Provider> 
            </selectedMuscleInTab.Provider>
            <Footer 
                changeTab={onChangeSelectedMuscle}
                selectedMuscle={selectedMuscle}
            />
            </musclesContext.Provider>
            
        </MuiThemeProvider>
    );
}

export default Exercise;