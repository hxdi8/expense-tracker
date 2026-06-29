import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // CORE UTILITIES
  keyboardWrapper: {
    flex: 1,
    backgroundColor: "#F6F8FA", // Modern off-white background
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
    justifyContent: "center", // Vertically centers your form layout perfectly
  },

  // CARD CONTAINERS
  expenseCard: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  form: {
    backgroundColor: "#FFFFFF",
    marginTop: '5%',
    padding: 24,
    borderRadius: 24, // Softer curves matching GPay style
    shadowColor: "#1A1A1A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },

  // TEXT TYPOGRAPHY
  welcome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5F6368",
    textAlign: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: 'center',
    color: "#202124",
  },
  label: {
    fontSize: 13,
    color: "#5F6368",
    marginBottom: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  balanceContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 8,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#5F6368",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#202124",
  },

  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  miniStatBox: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    justifyContent: "center",
  },
  incomeMiniBox: {
    backgroundColor: "#E6F4EA",
  },
  expenseMiniBox: {
    backgroundColor: "#FCE8E6",
  },
  miniBoxLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5F6368",
    marginBottom: 4,
  },
  incomeMiniValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#137333",
  },
  expenseMiniValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#C5221F",
  },

  transactionHistory: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 4,
  },
  historyHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#202124",
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  leftBlock: {
    flex: 1,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#5F6368',
  },
  rightBlock: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
  },
  incomeColor: {
    color: '#137333',
  },
  expenseColor: {
    color: '#202124',
  },
  deleteButton: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  deleteText: {
    fontSize: 11,
    color: '#D93025',
    fontWeight: '500',
  },

  input: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
    color: "#202124",
  },
  dropdown: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    color: "#333"
  },
  placeholderStyle: { fontSize: 15, color: "#9AA0A6" },
  selectedTextStyle: { fontSize: 15, color: "#202124" },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 15, borderRadius: 8 },

  typeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20
  },
  typeButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  inactiveButton: {
    backgroundColor: "#FAFAFA",
    borderColor: "#E0E0E0",
  },
  inactiveButtonText: {
    color: "#5F6368",
    fontWeight: "500",
  },
  activeExpenseButton: {
    backgroundColor: "#FCE8E6",
    borderColor: "#C5221F",
  },
  activeExpenseText: {
    color: "#C5221F",
    fontWeight: "700",
  },
  activeIncomeButton: {
    backgroundColor: "#E6F4EA",
    borderColor: "#137333",
  },
  activeIncomeText: {
    color: "#137333",
    fontWeight: "700",
  },

  datePickerButton: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  datePickerButtonText: {
    fontSize: 15,
    color: "#202124",
    fontWeight: "500",
  },

  expenseButton: {
    backgroundColor: "#202124",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  saveButton: {
    backgroundColor: "#202124",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  authForm: {
    width: "100%",
  },
  head: {
    fontFamily: "GreatVibes_400Regular",
    fontSize: 48,
    color: "#202124",
    textAlign: "center",
    marginBottom: 36,
  },
  authInput: {
    marginBottom: 8,
  },
  messageSlot: {
    minHeight: 22,
    marginBottom: 6,
  },
  errorText: {
    color: "#D93025",
    fontSize: 13,
  },
  blueText: {
    color: "#1A73E8",
    fontWeight: "700",
  },
  loginOrSign: {
    fontSize: 14,
    color: "#5F6368",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 22,
  },
  authButton: {
    marginTop: 0,
  },
  successText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    color: "#137333",
    fontWeight: "600",
  },
  adminLogin: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: "#f44336",
    fontWeight: 'bold',
  },
  adminLoginLink: {
    color: "#D93025",
    fontSize: 13,
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 0,
  },

  iconButton: {
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  editButton: {
    backgroundColor: "#4CAF50",
  },

  deleteButton2: {
    backgroundColor: "#F44336",
  },

  icon: { marginRight: 5 },

  imageUpload: {
    position: 'absolute',
    bottom: 10,
  }
});

export default styles;
