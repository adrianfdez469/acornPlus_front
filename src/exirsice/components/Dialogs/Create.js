import React, { useState, useEffect, useContext } from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';

import { musclesContext, selectedMuscleInTab } from '../store/contexts';

const CreateExercise = (
    
    {
        open,
        onCloseHandler,
        editingExercise,
        save
    }
    ) => {

    const muscles = useContext(musclesContext).filter((_, index) => index > 0);
    const selectedMuscle = useContext(selectedMuscleInTab);

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [muscleInput, setMuscleInput] = useState('');

    useEffect(() => {
        if(editingExercise !== null){
            setTitleInput(editingExercise.title);
            setDescriptionInput(editingExercise.description);
            setMuscleInput(editingExercise.muscle);
        }else if(selectedMuscle !== 'All' ) {
            setMuscleInput(selectedMuscle);
        }
        
        return () => {
            setTitleInput('');
            setDescriptionInput('');
            setMuscleInput('');
        }
    }, [editingExercise, selectedMuscle]);
    

    const onPressSaveBtn = () => {
        if(editingExercise)
            save({
                ...editingExercise, 
                title: titleInput,
                description: descriptionInput, 
                muscle: muscleInput
            });
        else {
            save({
                title: titleInput,
                description: descriptionInput, 
                muscle: muscleInput
            });
        }
        onCloseHandler();
    }

    return (
        <>
            
            <Dialog open={open} onClose={onCloseHandler} fullWidth={true}>
                <DialogTitle>
                    Create { editingExercise ? editingExercise.muscle : 'New' } Exercise
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, fill out the form below.
                    </DialogContentText>
                        <TextField 
                            autoFocus
                            label='Title'
                            value={ titleInput }
                            onChange={(event) => setTitleInput(event.target.value) }
                            fullWidth
                            variant='outlined'
                        />
                        <TextField 
                            label='Description'
                            multiline
                            rows={3}
                            value={ descriptionInput }
                            onChange={(event) => setDescriptionInput(event.target.value)}
                            fullWidth
                            variant='outlined'
                            style={{marginTop: 10}}
                        />
                        <InputLabel>
                            <Select
                                style={{marginTop: 10, width: '100%'}}
                                variant='outlined'
                                value={ muscleInput }
                                onChange={(event) => setMuscleInput(event.target.value)}
                            >
                                {muscles.map(opt => (
                                    <MenuItem
                                        key={opt}
                                        value={opt}
                                    >{opt}
                                    </MenuItem>))}
                            </Select>
                        </InputLabel>
                        
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary" 
                        variant="outlined"
                        onClick={onPressSaveBtn}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateExercise;