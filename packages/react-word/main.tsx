import { Document, Section, Paragraph } from "@cordel/react-docx";
import { renderToBuffer } from "@cordel/react-docx";

const Doc = () => (
  <Document>
    <Section>
      <Paragraph>It works.</Paragraph>
    </Section>
  </Document>
);

const { buffer } = await renderToBuffer(<Doc />);
await Bun.write("pokemon.docx", buffer);