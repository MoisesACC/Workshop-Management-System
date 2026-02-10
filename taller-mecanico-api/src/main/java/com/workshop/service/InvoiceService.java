package com.workshop.service;

import com.workshop.domain.Invoice;

import com.workshop.common.BaseService;

public interface InvoiceService extends BaseService<Invoice, Long> {
    Invoice generateInvoice(Long workOrderId);

    void markAsPaid(Long invoiceId);
}
