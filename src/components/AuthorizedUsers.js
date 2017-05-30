import React from 'react';
import {
    Button,

}
from 'reactstrap';

function generateAuthorizedUsers(boardMembers, requestRemoveBoardmember) {
    return boardMembers.map((boardMember) => {

        return (
            <div key={boardMember.memberId}>
                <input  type="text" disabled={true} value={boardMember.User.username}/>{" "}
                <Button outline color="danger" size="sm" onClick={() => requestRemoveBoardmember(boardMember.board_id, boardMember.member_id)}>X</Button>
            </div>
        );
    });
}

const AuthorizedUsers = ({
    members,
    requestRemoval
}) => {
    return (

        <div>
            {generateAuthorizedUsers(members, requestRemoval)}
        </div>

    );

};

export default AuthorizedUsers;
