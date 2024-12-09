import { Box, Card, CardHeader, List, Typography } from "@mui/material";
import { useCompanyStore } from "@/features/company/presentation/index";
import { useEffect } from "react";
import Grid from "@mui/material/Grid2";



const CompanyListPage = () => {

    const comapnies = useCompanyStore((state) => state.companies);
    const getCompanies = useCompanyStore.use.getCompanies();

    useEffect(() => {
        async function fetchCompanies() {
            await getCompanies();
        }

        fetchCompanies();
    }, [getCompanies]);

    return (
        <Box
            component={"main"} sx={{ flexGrow: 1, m: 1 }}>
             <Typography variant="h3">Companies</Typography>

            <Grid>
                <List
                    dense={true}>
                    {
                        Array.isArray(comapnies) && comapnies.map((company) => {
                            return <Card
                                key={company.id}
                                raised
                                onClick={() => console.log("company", company)}
                                sx={{ mb: 2, p: 2 }}
                            >
                                <CardHeader
                                    title={company.name}
                                    subheader={company.email}
                                />
                            </Card>
                        })
                    }

                </List>
            </Grid>
        </Box>
    )
}

export default CompanyListPage;