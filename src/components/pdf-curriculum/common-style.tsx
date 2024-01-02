import { StyleSheet } from "@react-pdf/renderer";

export const commonStyles = StyleSheet.create({
  body: {
    paddingTop: 55,
    paddingBottom: 65,
    paddingHorizontal: 55,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionTitle: {
    fontWeight: "normal",
    fontSize: 14,
  },
  chapter: {
    marginVertical: 6,
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
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
