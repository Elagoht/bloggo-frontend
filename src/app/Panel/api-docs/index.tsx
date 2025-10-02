import { IconApi, IconLock } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import Button from "../../../components/form/Button";
import ButtonGroup from "../../../components/form/ButtonGroup";
import Container from "../../../components/layout/Container";
import FormCard from "../../../components/layout/Container/FormCard";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import SectionHeader from "../../../components/layout/SectionHeader";
import { EndpointCard } from "./components/EndpointCard";
import { APIDocumentation } from "./types";

const APIDocsPage: FC = () => {
  const [apiDocs, setApiDocs] = useState<APIDocumentation | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api-docs.json")
      .then((res) => res.json())
      .then((data) => setApiDocs(data))
      .catch((err) => console.error("Failed to load API docs:", err));
  }, []);

  if (!apiDocs) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-smoke-500">Loading API documentation...</div>
      </div>
    );
  }

  const tags = Array.from(
    new Set(apiDocs.endpoints.map((endpoint) => endpoint.tag))
  );

  const filteredEndpoints = selectedTag
    ? apiDocs.endpoints.filter((endpoint) => endpoint.tag === selectedTag)
    : apiDocs.endpoints;

  return (
    <Container>
      <PageTitleWithIcon icon={IconApi}>
        {apiDocs.info.title} <small>Version {apiDocs.info.version}</small>
      </PageTitleWithIcon>

      <p>{apiDocs.info.description}</p>

      <FormCard color="warning">
        <SectionHeader icon={IconLock} color="warning">
          Authentication Required
        </SectionHeader>

        <small className="px-2">{apiDocs.authentication.description}</small>

        <code className="bg-warning-100 dark:bg-warning-900/40 px-3 py-1 rounded text-sm text-warning-900 dark:text-warning-100">
          {apiDocs.authentication.header}: your-trusted-frontend-key
        </code>
      </FormCard>

      <ButtonGroup>
        <Button
          onClick={() => setSelectedTag(null)}
          color="primary"
          variant={selectedTag === null ? "default" : "outline"}
        >
          All Endpoints ({apiDocs.endpoints.length})
        </Button>

        {tags.map((tag) => {
          const count = apiDocs.endpoints.filter((e) => e.tag === tag).length;
          return (
            <Button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              variant={selectedTag === tag ? "default" : "outline"}
            >
              {tag} ({count})
            </Button>
          );
        })}
      </ButtonGroup>

      {/* Endpoints */}
      <div className="flex flex-col gap-2">
        {filteredEndpoints.map((endpoint, index) => (
          <EndpointCard
            key={`${endpoint.method}-${endpoint.path}-${index}`}
            endpoint={endpoint}
            baseUrl={apiDocs.baseUrl}
          />
        ))}
      </div>
    </Container>
  );
};

export default APIDocsPage;
