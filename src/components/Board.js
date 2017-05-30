import React from 'react';

import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const Board = (props) => {
    const { name, id, description } = props;
  return (
      <Card className="boardBoxes">
        <Link to={`/dashboard/boards/${id}`}>
            <CardBlock>
              <CardTitle>Board: {name}</CardTitle>
              <CardSubtitle>board subtitle</CardSubtitle>
              <CardText>{description}</CardText>
            </CardBlock>
        </Link>
      </Card>
  );
};

export default Board;


