import { fetchFont } from './utils';
import satori from 'satori';

export async function buildSvg(
  font: ArrayBuffer,
  tri: string,
  colorPrimary: string,
  colorSecondary: string
) {

  const element = (
    <div
      style={{
        // width: "100%",
        // maxWidth: "675px",
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPrimary,
        padding: 40,
        border: '20px solid',
        borderColor: colorSecondary
      }}
    >
      <div
        style={{
          // height: 220,
          fontSize: 300,
          fontStyle: 'normal',
          fontWeight: 900,
          // lineHeight: 220,
          color: colorSecondary,
          textAlign: 'center',
          transform: `translate(0px, 25px) scaleX(1)`,
          verticalAlign: 'middle'
        }}
      >
        {tri}
      </div>
    </div>
  );

  return await satori(element, {
    // width: 675,
    height: 300,
    fonts: [
      {
        name: 'United Sans SemiCond',
        data: font,
        weight: 900,
        style: 'normal'
      }
    ]
  });
}