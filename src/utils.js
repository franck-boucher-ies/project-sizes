export const labelsQuery = (orgId, projectId) => `
query organization {
  organization(login: "${orgId}") {
    project(number: ${projectId}) {
      name
      columns(first: 100) {
        nodes {
          name
          cards(first: 100) {
            nodes {
              note
              content {
                ... on Issue {
                  labels(first: 10) {
                    nodes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const resultToColumnSizes = (result) => {
  return result.organization.project.columns.nodes.map((column) => {
    let totalSize = 0;
    column.cards.nodes
      .filter(
        (card) =>
          !!card.content &&
          !!card.content.labels &&
          card.content.labels.nodes.some((label) =>
            label.name.includes("Size : ")
          )
      )
      .forEach((card) => {
        const sizeLabel = card.content.labels.nodes.find((label) =>
          label.name.includes("Size : ")
        );
        if (sizeLabel) {
          const [_, sizeStr] = sizeLabel.name.split(" : ");
          totalSize += Number(sizeStr);
        }
      });
    return {
      name: column.name,
      totalSize,
    };
  });
};

export const userQuery = `
query user {
  viewer {
    login
  }
}
`;
