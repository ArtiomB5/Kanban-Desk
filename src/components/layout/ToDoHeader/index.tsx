import { ShowInput } from "../../utils/ShowInput";
import Typography from "@mui/material/Typography";
import * as CONSTS from "../../../constants";

type propsType = {
  visibility: boolean;
};

export const ToDoHeader = (props: propsType) => {
  return (
    <>
      <Typography variant="h2" gutterBottom component="div">
        {CONSTS.TYPORGAPHY_CONSTANTS.TO_DO}
      </Typography>
      <ShowInput visibility={props.visibility} />
    </>
  );
};
