import {Container, LinearProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Loading } from "../Load/Load";

export const EmptyPage = () => {
    return(
        <Container>

            <Paper sx={{ width: "100%", height: "50px" ,overflow: "hidden", padding: "4px"}}>
                <Typography variant="h6" align="center"> Você ainda não adicionou nenhuma informação...</Typography>
                <LinearProgress />
            </Paper>
           
        </Container>
    );
}