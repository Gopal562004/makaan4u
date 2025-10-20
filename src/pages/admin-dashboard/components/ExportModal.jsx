import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const ExportModal = ({ isOpen, onClose, reportData, onExport }) => {
  const [selectedFormats, setSelectedFormats] = useState(["pdf"]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [emailDelivery, setEmailDelivery] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  const exportFormats = [
    {
      id: "pdf",
      label: "PDF Document",
      icon: "FileText",
      description: "Best for presentations and sharing",
    },
    {
      id: "excel",
      label: "Excel Spreadsheet",
      icon: "FileSpreadsheet",
      description: "Best for data analysis",
    },
    {
      id: "csv",
      label: "CSV File",
      icon: "Database",
      description: "Best for data processing",
    },
  ];

  const handleFormatToggle = (formatId) => {
    setSelectedFormats((prev) =>
      prev?.includes(formatId)
        ? prev?.filter((id) => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleReportToggle = (reportId) => {
    setSelectedReports((prev) =>
      prev?.includes(reportId)
        ? prev?.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAllReports = () => {
    if (selectedReports?.length === reportData?.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reportData?.map((report) => report?.id));
    }
  };

  const handleExport = () => {
    const exportConfig = {
      formats: selectedFormats,
      reports:
        selectedReports?.length > 0
          ? selectedReports
          : reportData?.map((r) => r?.id),
      emailDelivery,
      emailAddress: emailDelivery ? emailAddress : null,
    };

    onExport(exportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Export Reports
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose format and delivery options
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Formats */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Export Formats</h3>
            <div className="space-y-3">
              {exportFormats?.map((format) => (
                <div
                  key={format?.id}
                  className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <Checkbox
                    checked={selectedFormats?.includes(format?.id)}
                    onChange={() => handleFormatToggle(format?.id)}
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <Icon
                      name={format?.icon}
                      size={20}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {format?.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">Select Reports</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAllReports}
              >
                {selectedReports?.length === reportData?.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {reportData?.map((report) => (
                <div
                  key={report?.id}
                  className="flex items-center space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-smooth"
                >
                  <Checkbox
                    checked={selectedReports?.includes(report?.id)}
                    onChange={() => handleReportToggle(report?.id)}
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${report?.color}`}
                    >
                      <Icon name={report?.icon} size={16} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {report?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report?.recordCount?.toLocaleString()} records
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Delivery */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Checkbox
                checked={emailDelivery}
                onChange={(e) => setEmailDelivery(e?.target?.checked)}
              />
              <div>
                <p className="font-medium text-foreground">Email Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Send reports directly to email
                </p>
              </div>
            </div>

            {emailDelivery && (
              <div className="mt-3">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            {selectedFormats?.length} format(s) •{" "}
            {selectedReports?.length || reportData?.length} report(s)
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={handleExport}
              disabled={selectedFormats?.length === 0}
            >
              Export Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
