import { useRouter } from "next/router";
import { FORM_BUILDER_ROUTES } from "./constants";
import { Tabs, TabsList } from "@app/ui/components/tabs";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useMemo } from "react";

export const FormBuilderNav = () => {
  const router = useRouter();

  const page = useMemo(() => {
    return router.pathname.split("/")[6];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const { id, eventid, formid } = router.query;

  return (
    <div className="flex fixed w-full p-3 justify-between bg-brand-pink-100 ">
      <div className="flex">
        <div
          className="font-small flex text-lg pr-3 hover:cursor-pointer justify-center items-center gap-3"
          onClick={() => router.push(`/org/${id}/${eventid}/form`)}
        >
          <FiArrowLeft className="mr-2.1" />
        </div>
        <Tabs defaultValue="Event" className="w-[400px]">
          <TabsList>
            {FORM_BUILDER_ROUTES.map(({ name }) => {
              return (
                <button
                  key={name}
                  onClick={() => {
                    router.push(
                      `/org/${id}/${eventid}/form/${formid}/${name.toLowerCase()}`
                    );
                  }}
                  className={`${
                    page === name.toLowerCase() ? "" : "hover:text-black/60"
                  } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-sky-400 transition focus-visible:outline-2`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {page === name.toLowerCase() && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-white mix-blend-difference text-black"
                      style={{ borderRadius: 10 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {name}
                </button>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
