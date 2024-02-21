import { StyleSheet } from "@react-pdf/renderer";

export const commonStyles = StyleSheet.create({
  body: {
    paddingTop: 55,
    paddingBottom: 65,
    paddingLeft: 55,
    paddingRight: 65,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
  chapter: {
    fontSize: 18,
    fontFamily: "Calibri",
  },
  fieldText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
  },
  fieldAdditionalText: {
    fontWeight: "normal",
    fontSize: 12,
    fontFamily: "Times New Roman",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Calibri",
  },
  yearsText: {
    fontSize: 10,
    fontFamily: "Cambria",
    fontWeight: "bold",
  },
  yearsAdditionalText: {
    fontSize: 10,
    fontFamily: "Cambria",
    textDecoration: "underline",
    fontWeight: "normal",
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
