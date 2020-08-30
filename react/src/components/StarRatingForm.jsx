import React, { useContext } from "react";
import { Paper, Container } from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import { AdminUsersContext } from "../contexts/AdminUsersContext";

export default function StarRatingForm({ setValues, values }) {
  const {
    optionsList,
    starCurrentValues,
    starDesiredValues,
    setStarCurrentValues,
    setStarDesiredValues,
  } = useContext(AdminUsersContext);

  const onStarClickCurrent = (e, newValue, title) => {
    setStarCurrentValues({
      ...starCurrentValues,
      [title]: newValue,
    });
    setValues({ ...values, submitted: false });
  };

  const onStarClickDesired = (event, newValue, title) => {
    setStarDesiredValues({
      ...starDesiredValues,
      [title]: newValue,
    });
    setValues({ ...values, submitted: false });
  };

  return (
    <Container>
      {optionsList.map((skill, index) => {
        return (
          <Paper key={index}>
            <h4>Skill: {skill.title}. Current Level:</h4>
            <Rating
              name={skill.title + "Current Skill"}
              value={starCurrentValues[skill.title] || 0}
              onChange={(e, newValue) =>
                onStarClickCurrent(e, newValue, skill.title)
              }
            />
            <h4>Skill: {skill.title}. Desired Level:</h4>
            <Rating
              name={skill.title + "Desired Skill"}
              value={starDesiredValues[skill.title] || 0}
              onChange={(e, newValue) =>
                onStarClickDesired(e, newValue, skill.title)
              }
            />
          </Paper>
        );
      })}
    </Container>
  );
}
