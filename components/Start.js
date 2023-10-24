import { useEffect, useState } from "react";
import Home from "./Home";
import Slots from "./Slots";
import Bots from "./Bots";
import { useSelector } from "react-redux";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Start = () => {
  const [page, setPage] = useState("home");
  const newSlot = useSelector((state) => state.adi.newSlot);

  useEffect(() => {
    if (newSlot) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Hi",
        textBody: newSlot.text,
        onPress: () => {
          gotoSlotsPage(newSlot.botId);
        },
      });
    }
  }, [newSlot]);

  return (
    <>
      {page === "home" ? <Home gotoBotsPage={() => setPage("bots")} /> : ""}
      {page === "bots" ? (
        <Bots
          gotoLoginPage={() => setPage("home")}
          gotoSlotsPage={(botId) => setPage(`slots:${botId}`)}
        />
      ) : (
        ""
      )}
      {page.split(":")[0] === "slots" ? (
        <Slots
          botId={page.split(":")[1]}
          gotoBotsPage={() => setPage("bots")}
          gotoLoginPage={() => setPage("home")}
          gotoSlotsPage={(botId) => setPage(`slots:${botId}`)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Start;
