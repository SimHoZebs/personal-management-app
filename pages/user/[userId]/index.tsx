import React, { useEffect, useState } from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "../../../lib/components/List";
import { useRouter } from "next/router";

//API functions
import readUser from "../../../lib/api/readUser";
import createList from "../../../lib/api/createList";

//schema and interfaces
import { UserSchema } from "../../../lib/schema/UserSchema";
import addListId from "../../../lib/api/addListId";
import updateSelectedListId from "../../../lib/api/updateSelectedListId";
import SideMenu from "../../../lib/components/SideMenu";
//get user data from login form
//fill page with user data

/**
 * displays user dashboard.
 *
 */
export default function Dashboard() {
  const [user, setUser] = useState<UserSchema | undefined>();
  const [currListName, setCurrListName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    /**
     * Creates a list and adds it to a user.
     * Sets that list as selected list.
     * @returns userSchema; The user the temp defaults were applied.
     * @returns string; if any error occurs.
     */
    async function addTempDefaults(userId: string) {
      const createListRes = await createList(userId, "default list");
      if (typeof createListRes === "string") {
        return createListRes;
      }

      const addListIdRes = await addListId(userId, createListRes._id);
      if (typeof addListIdRes === "string") {
        return addListIdRes;
      }

      const updateSelectedListIdRes = await updateSelectedListId(
        userId,
        createListRes._id
      );
      return updateSelectedListIdRes;
    }

    /**
     * Reads user data with given userId.
     */
    async function initUserPage(userId: string) {
      const readUserRes = await readUser(null, userId);
      if (typeof readUserRes === "string") {
        console.log(readUserRes);
        return;
      }
      if (readUserRes === null) {
        console.log(`User with id ${userId} does not exist.`);
        //route back to login screen?
        return;
      }

      let user = readUserRes;

      if (user.listIdArray.length === 0) {
        const addTempDefaultsRes = await addTempDefaults(userId);
        if (typeof addTempDefaultsRes === "string") {
          console.log(addTempDefaultsRes);
          return;
        }
        user = addTempDefaultsRes;
      }

      setUser(user);
    }

    const userId = router.query.userId;

    if (typeof userId !== "string") {
      console.log("userId is not a string. It is ", userId);
      return;
    }
    initUserPage(userId);
    setIsLoading(false);
  }, [router.query.userId]);

  return (
    <>
      <Head>
        <title>Dashboard - AnotherToDoApp</title>
      </Head>
      {isLoading ? (
        <Typography variant="h1">Loading</Typography>
      ) : (
        <Container disableGutters>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3}>
              <SideMenu currListName={currListName} />
            </Grid>

            <Grid item xs={9}>
              <Container sx={{ flexDirection: "column", textAlign: "right" }}>
                <Typography variant="caption">
                  Hello, {user?.username}
                </Typography>
                {user !== undefined ? (
                  <List
                    userId={user?._id}
                    listId={user?.selectedListId}
                    currListName={currListName}
                    setCurrListName={setCurrListName}
                  />
                ) : (
                  <Typography>user is undefined</Typography>
                )}
              </Container>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
