import React from 'react';
import NewBoardForm from './NewBoardForm';
import BoardSelector from './BoardSelector';
import {
    Nav,
    NavItem,
    Button
}
from 'reactstrap';
import {
    requestBoardRemoval
}
from '../actions/boardsActions';
import {
    connect
}
from 'react-redux';
import {
    withRouter
}
from 'react-router-dom';
import {
    requestBoardCreation
}
from '../actions/boardsActions';
import serialize from 'form-serialize';
import * as helpers from '../helpers';

function getLocation(currentBoard, currentList) {
    if (!currentBoard) {
        return "Board";
    }
    else if (!currentList) {
        return "List";
    }
    return "Card";
}

function getCrumbs(...entities) {
    let crumb = "";
    entities.forEach((entity) => {
        if (!entity) {
            return crumb;
        }
        crumb += `${entity.id}>`;
    });
    return crumb;
}

const DashboardNav = ({
    boards,
    requestBoardRemoval,
    currentBoard,
    currentList,
    requestBoardCreation
}) => {

    return (
        <Nav className="flex-space-between">
            <NavItem>
                <p>{getCrumbs(currentBoard, currentList)}</p>
                <h2>{getLocation(currentBoard, currentList)}</h2>
            </NavItem>
            <NavItem>
                <BoardSelector boards={boards}/>
                <Nav>
                    <NavItem>
                        <NewBoardForm onSubmit={requestBoardCreation} buttonLabel={"+Board"} />
                    </NavItem>
                    <NavItem>
                        <Button disabled={currentBoard ? false : true} onClick={requestBoardRemoval}>Delete board</Button>
                    </NavItem>
                </Nav>
            </NavItem>
        </Nav>
    );
};

function mapStateToProps(state, ownProps) {

    return {
        currentBoard: state.boards.data.find((board) => {
            return board.id == ownProps.match.params.boardId;
        }),
        currentList: helpers.findListByListId(ownProps.match.params.listId, state.boards.data)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestBoardRemoval: () => {
            let token = localStorage.getItem('token');
            dispatch(requestBoardRemoval(ownProps.match.params.boardId, token));
            ownProps.history.replace('/dashboard/boards');
        },
        requestBoardCreation: (e) => {
            e.preventDefault();
            const form = serialize(e.target, {
                hash: true
            });
            dispatch(requestBoardCreation(form));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardNav));



// function getLocationObj(path) {
//     let locationObj;
//     //if trailing / remove it
//     if (path.charAt(path.length - 1) === '/') {
//         path = path.slice(0, path.length - 1);
//     }
//     //remove leading dashboard and /
//     let dashboardIndex = path.indexOf('dashboard/');
//     path = path.slice(dashboardIndex + 10);
//     //split at /s
//     let pathPairs = path.split('/');

//     for (let i = 0; i < pathPairs.length; i += 2) {
//         locationObj[pathPairs[i]] = pathPairs[i + 1];
//     }
//     return locationObj;
// }
