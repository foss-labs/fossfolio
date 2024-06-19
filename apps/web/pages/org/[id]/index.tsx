import { useEffect, useState } from "react";
import { NextPageWithLayout } from "next";
import { HomeLayout } from "@app/layout";
import { Members } from "@app/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@app/ui/components/tabs";
import { Events, InviteModal, OrgSettings } from "@app/views/org";
import { useToggle } from "@app/hooks";
import { useRouter } from "next/router";
import { TabName, Tabs as ITabs } from "@app/types";

const Org: NextPageWithLayout = () => {
  const [activeTab, setTab] = useState<ITabs>("events");
  const [inviteLink, setInviteLink] = useState("");
  const [isOpen, toggleOpen] = useToggle();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      if (tab && (tab === "events" || tab === "teams" || tab === "settings")) {
        setTab(tab as ITabs);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (router.isReady) {
      router.replace({
        query: {
          ...router.query,
          tab: activeTab,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="mt-4 p-4 h-[92vh]">
      <Tabs
        value={activeTab}
        defaultValue={activeTab}
        className="h-full"
        onValueChange={(el: string) => setTab(el as ITabs)}
      >
        <div className="flex items-center justify-center">
          <TabsList>
            {TabName.map((el) => (
              <TabsTrigger value={el.value} key={el.title}>
                {el.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value="events"
          className="flex md:flex-row flex-wrap gap-5 sm:justify-center"
        >
          <Events />
        </TabsContent>
        <TabsContent value="teams">
          <Members setLink={setInviteLink} onInviteModal={toggleOpen.on} />
          <InviteModal
            isOpen={isOpen}
            onClose={toggleOpen.off}
            link={inviteLink}
          />
        </TabsContent>
        <TabsContent
          value="settings"
          className="flex justify-end items-center pb-3 flex-col gap-3"
        >
          <OrgSettings activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

Org.Layout = HomeLayout;
Org.RequireAuth = true;

export default Org;
