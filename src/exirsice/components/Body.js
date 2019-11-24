import React, { useState, useContext } from 'react';

import {
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Zoom,
    Fab,
    withWidth,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';
import { Delete, Edit, Add } from '@material-ui/icons';

import CreateExercise from './Dialogs/Create';
import {exercisesContext} from './store/contexts';

const styles = {
    Papper: {
        padding: 20,
        marginTop: 10, 
        marginBottom: 10, 
        marginRight: 5, 
        marginLeft: 5,
        height: 450,
        overflow: 'auto',
        position: 'relative'
    },
    Fab: {
        position: 'absolute',
        bottom: '12%',
        right: '30px'
    },
    PapperOne: {
        marginRight: 0,
        paddingRight: 0
    }
};

const AppBody = (
    {
        grupedExercises,
        selectedMuscle,
        exerciseAction,
        width
    }
) => {

    const isSmall = /xs/.test(width);

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    const onDeleteExercise = (id) => {
        exerciseAction({type: 'delete', exerciseId: id});
    }

    const getSelectedExerciseData = () => {
        return selectedExercise || {
            title: 'Welcome',
            description: 'Please select an exercise from the list of the left!'
        }
    }

    const globalExercies = useContext(exercisesContext);
    const onSelectExercise = (id) => {
        setSelectedExercise(globalExercies.find(e => e.id === id));
    }

    const openCreateExerciseDialog = () => {
        setEditingExercise(null);
        setOpenCreate(true);
    }
    const closeCreateExerciseDialog = () => {
        setEditingExercise(null);
        setOpenCreate(false);
    }
     
    const [editingExercise, setEditingExercise] = useState(null);
    const openEditExercise = (id) => {
        setEditingExercise(globalExercies.find(e => e.id === id));
        setOpenCreate(true);
    }

    const saveExercise = (exercise) => {
        exerciseAction({type: 'save', exercise});
    }

    const deselectExercise = () => {
        setSelectedExercise(null);
    }

    const gridInfoStyle = isSmall ? {
        display: 'none'
    } : null;


    const cmpInfo = isSmall ? (
        <Dialog open={selectedExercise !== null} onClose={deselectExercise} fullWidth>
            <DialogTitle>{getSelectedExerciseData().title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{getSelectedExerciseData().description}</DialogContentText>
            </DialogContent>
        </Dialog>
    ) : 
    (
        <Grid item sm={6} style={gridInfoStyle} >
            <Paper style={styles.Papper}>
                <Typography variant='h6'>{getSelectedExerciseData().title}</Typography>
                <Typography variant='subtitle2'>{getSelectedExerciseData().description}</Typography>
                
                
            </Paper>
        </Grid>);

    return (
        <>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Paper style={{...styles.Papper,...styles.PapperOne}}>
                    {grupedExercises
                        .filter(e => selectedMuscle === 'All' || e[0] === selectedMuscle )
                        .map(([group, exercises]) => (
                            <React.Fragment key={group} >
                                <Typography variant="h5" style={{textTransform: 'capitalize'}}>
                                    {group}
                                </Typography>
                                <List>
                                    {exercises.map(({id, title}) => (                                        
                                        <ListItem 
                                            button 
                                            key={id}
                                            onClick={() => onSelectExercise(id)}
                                        >
                                            <ListItemText >
                                                {title}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    onClick={() => openEditExercise(id)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => onDeleteExercise(id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>                                            
                                    ))}                                
                                </List>
                            </React.Fragment>
                                    ))}
                </Paper>
            </Grid>
            {cmpInfo}
        </Grid>
            

        <Zoom in timeout={500} >
                    <Fab
                        color='primary'
                        onClick={openCreateExerciseDialog}
                        style={styles.Fab}
                        size='medium'
                    >
                        <Add color='inherit'/>
                    </Fab>
                </Zoom>
                <CreateExercise 
                    open={openCreate}
                    onCloseHandler={closeCreateExerciseDialog}
                    editingExercise={editingExercise}
                    save={saveExercise}
                />
        </>
    );

}

export default withWidth()(AppBody);