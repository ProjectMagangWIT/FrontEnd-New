import MetaHead from "@/components/MetaHead/metahead";
import TabelDataUsageHistory from "@/components/elements/table/usageHistory/tabel_data_usage_history";
import Headers from "@/components/header";
import Layout from "@/components/layout/layout";
import Section from "@/components/section/section";
import Sidebar from "@/components/sidebar/sidebar";

export default function UsageHistory() {
  return (
    <>
      <MetaHead title="Usage History" description="Welcome to Usage History" />
      <Section tittle="Usage History">
        <TabelDataUsageHistory />
      </Section>
    </>
  );
}
