import { StyleSheet } from "@react-pdf/renderer";

export const commonStyles = StyleSheet.create({
  body: {
    paddingTop: 55,
    paddingBottom: 65,
    paddingLeft: 40,
    paddingRight: 65,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  descriptionTitle: {
    fontWeight: "normal",
    fontSize: 10,
  },
  chapter: {
    marginVertical: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  subChapter: {
    marginVertical: 6,
    fontSize: 12,
    fontWeight: "bold",
  },
  author: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  commonCentralizedView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
