// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
module.exports = {
    headerConfig: {
      logoUrl: "https://raw.githubusercontent.com/log-Mushun/vtex/main/internalinterview.store-theme/assets/midori-logo.jpg",
      logoTitle: "Midori",
      height: 50,
    },
    orderFormConfiguration: {
      disableReceiverName: false,
      allowMultipleDeliveries: true,
      hideReceiverCPF: false,
      requiresDocument: true
    },
    cartPageConfig: {
      allowRemoval: true,
      showShippingCalculator: true,
      showItemsPrice: true
    },
    paymentConfig: {
      showInstallments: true,
      hideBankTransferValue: false
    },
    deliveryConfig: {
      showDeliveryGroup: true,
      showPickupGroup: true,
      showDeliveryPrice: true,
      showPickupPrice: true
    },
    storeConfig: {
      showNoteField: true,
      allowManualPrice: false,
      allowManualPriceOnPickup: false
    },
    customFields: {
      attachment: {
        fields: []
      }
    }
}