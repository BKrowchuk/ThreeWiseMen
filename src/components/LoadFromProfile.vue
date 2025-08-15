<template>
  <div class="load-from-profile">
    <button 
      @click="showLoadModal = true" 
      class="load-btn"
      :disabled="!hasProfileData"
      :title="hasProfileData ? 'Load saved data from your profile' : 'No profile data available'"
    >
      📊 Load from Profile
    </button>

    <!-- Load Modal -->
    <div class="load-modal-overlay" v-if="showLoadModal" @click="closeModal">
      <div class="load-modal" @click.stop>
        <div class="modal-header">
          <h3>Load from Financial Profile</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-content">
          <p class="modal-description">
            Select which profile data you'd like to load into the calculator fields. 
            This will pre-populate the form with your saved financial information.
          </p>
          
          <!-- Data Selection -->
          <div class="data-selection">
            <h4>Select Data to Load:</h4>
            
            <div class="data-groups">
              <div 
                v-for="(group, groupKey) in availableData" 
                :key="groupKey" 
                class="data-group"
              >
                <div class="group-header">
                  <label class="group-checkbox">
                    <input 
                      type="checkbox" 
                      :checked="isGroupSelected(groupKey)"
                      @change="toggleGroup(groupKey)"
                    />
                    <span class="checkmark"></span>
                    <strong>{{ group.title }}</strong>
                  </label>
                  <small>{{ group.description }}</small>
                </div>
                
                <div class="data-items">
                  <label 
                    v-for="(field, fieldKey) in group.fields" 
                    :key="fieldKey"
                    class="data-item"
                  >
                    <input 
                      type="checkbox" 
                      v-model="selectedData[groupKey][fieldKey]"
                      @change="updateGroupSelection(groupKey)"
                    />
                    <span class="checkmark"></span>
                    <span class="field-label">{{ field.label }}</span>
                    <span class="field-value">${{ formatNumber(field.value) }}</span>
                  </label>
                </div>
          </div>
        </div>
        
        <!-- Last Updated Info -->
        <div class="last-updated" v-if="hasProfileData">
          <h4>Profile Data Status:</h4>
          <div class="update-info">
            <div class="info-item">
              <span class="info-label">Last Updated:</span>
              <span class="info-value">{{ formatDate(lastUpdated) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Data Source:</span>
              <span class="info-value">{{ dataSource }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-btn">Cancel</button>
        <button 
          @click="loadToCalculator" 
          class="confirm-load-btn"
          :disabled="!hasSelectedData || isLoading"
        >
          <span v-if="!isLoading">Load Selected Data</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { profileActions } from '../store/profile'

export default {
  name: 'LoadFromProfile',
  props: {
    calculatorType: {
      type: String,
      required: true,
      validator: value => ['downPayment', 'netWorth', 'cashFlow'].includes(value)
    }
  },
  
  data() {
    return {
      showLoadModal: false,
      isLoading: false,
      selectedData: {},
      availableData: {}
    }
  },
  
  computed: {
    hasProfileData() {
      return profileActions.hasProfileData(this.calculatorType)
    },
    
    profileValues() {
      return profileActions.getProfileComparison(this.calculatorType)
    },
    
    hasSelectedData() {
      return Object.values(this.selectedData).some(group => 
        Object.values(group).some(selected => selected)
      )
    },
    
    lastUpdated() {
      const profileStore = profileActions.store
      switch (this.calculatorType) {
        case 'downPayment':
          return profileStore.lastUpdated.financialState || profileStore.lastUpdated.goals
        case 'netWorth':
          return profileStore.lastUpdated.netWorth
        case 'cashFlow':
          return profileStore.lastUpdated.cashFlow || profileStore.lastUpdated.financialState
        default:
          return null
      }
    },
    
    dataSource() {
      const profileStore = profileActions.store
      switch (this.calculatorType) {
        case 'downPayment':
          if (profileStore.lastUpdated.goals) return 'Down Payment Calculator'
          if (profileStore.lastUpdated.financialState) return 'Financial Profile'
          return 'Not available'
        case 'netWorth':
          return 'Net Worth Calculator'
        case 'cashFlow':
          if (profileStore.lastUpdated.cashFlow) return 'Cash Flow Calculator'
          if (profileStore.lastUpdated.financialState) return 'Financial Profile'
          return 'Not available'
        default:
          return 'Not available'
      }
    }
  },
  
  watch: {
    calculatorType: {
      handler() {
        this.initializeAvailableData()
      },
      immediate: true
    }
  },
  
  methods: {
    initializeAvailableData() {
      switch (this.calculatorType) {
        case 'downPayment':
          this.availableData = {
            income: {
              title: 'Income',
              description: 'Your monthly income information',
              fields: {
                monthlyIncome: {
                  label: 'Monthly Income',
                  value: this.profileValues.monthlyIncome || 0
                }
              }
            },
            savings: {
              title: 'Savings',
              description: 'Your current savings amounts',
              fields: {
                existingSavings: {
                  label: 'Existing Savings',
                  value: this.profileValues.existingSavings || 0
                }
              }
            },
            goals: {
              title: 'Financial Goals',
              description: 'Your home purchase targets',
              fields: {
                downPaymentTarget: {
                  label: 'Down Payment Target',
                  value: this.profileValues.downPaymentTarget || 0
                },
                monthlySavingsGoal: {
                  label: 'Monthly Savings Goal',
                  value: this.profileValues.monthlySavingsGoal || 0
                }
              }
            }
          }
          break
          
        case 'netWorth':
          this.availableData = {
            assets: {
              title: 'Assets',
              description: 'Your current asset values',
              fields: {}
            },
            liabilities: {
              title: 'Liabilities',
              description: 'Your current debt amounts',
              fields: {}
            }
          }
          
          // Populate asset fields
          if (this.profileValues.assets) {
            Object.keys(this.profileValues.assets).forEach(key => {
              this.availableData.assets.fields[key] = {
                label: this.formatAssetLabel(key),
                value: this.profileValues.assets[key] || 0
              }
            })
          }
          
          // Populate liability fields
          if (this.profileValues.liabilities) {
            Object.keys(this.profileValues.liabilities).forEach(key => {
              this.availableData.liabilities.fields[key] = {
                label: this.formatLiabilityLabel(key),
                value: this.profileValues.liabilities[key] || 0
              }
            })
          }
          break
          
        case 'cashFlow':
          this.availableData = {
            income: {
              title: 'Income',
              description: 'Your monthly income',
              fields: {
                monthlyIncome: {
                  label: 'Monthly Income',
                  value: this.profileValues.monthlyIncome || 0
                }
              }
            },
            fixedExpenses: {
              title: 'Fixed Expenses',
              description: 'Your recurring monthly expenses',
              fields: {}
            },
            variableExpenses: {
              title: 'Variable Expenses',
              description: 'Your flexible monthly expenses',
              fields: {}
            },
            savings: {
              title: 'Savings Targets',
              description: 'Your monthly savings goals',
              fields: {}
            }
          }
          
          // Populate expense fields
          if (this.profileValues.fixedExpenses) {
            Object.keys(this.profileValues.fixedExpenses).forEach(key => {
              this.availableData.fixedExpenses.fields[key] = {
                label: this.formatExpenseLabel(key),
                value: this.profileValues.fixedExpenses[key] || 0
              }
            })
          }
          
          if (this.profileValues.variableExpenses) {
            Object.keys(this.profileValues.variableExpenses).forEach(key => {
              this.availableData.variableExpenses.fields[key] = {
                label: this.formatExpenseLabel(key),
                value: this.profileValues.variableExpenses[key] || 0
              }
            })
          }
          
          if (this.profileValues.savings) {
            Object.keys(this.profileValues.savings).forEach(key => {
              this.availableData.savings.fields[key] = {
                label: this.formatSavingsLabel(key),
                value: this.profileValues.savings[key] || 0
              }
            })
          }
          break
      }
      
      // Initialize selected data
      this.selectedData = {}
      Object.keys(this.availableData).forEach(groupKey => {
        this.selectedData[groupKey] = {}
        Object.keys(this.availableData[groupKey].fields).forEach(fieldKey => {
          this.selectedData[groupKey][fieldKey] = true
        })
      })
    },
    
    toggleGroup(groupKey) {
      const isSelected = this.isGroupSelected(groupKey)
      Object.keys(this.selectedData[groupKey]).forEach(fieldKey => {
        this.selectedData[groupKey][fieldKey] = !isSelected
      })
    },
    
    isGroupSelected(groupKey) {
      return Object.values(this.selectedData[groupKey]).every(selected => selected)
    },
    
    updateGroupSelection(groupKey) {
      // This method is called when individual fields change
      // Group selection logic is handled by isGroupSelected computed property
    },
    
    async loadToCalculator() {
      this.isLoading = true
      
      try {
        // Prepare data to load based on selected fields
        const dataToLoad = {}
        
        Object.keys(this.selectedData).forEach(groupKey => {
          Object.keys(this.selectedData[groupKey]).forEach(fieldKey => {
            if (this.selectedData[groupKey][fieldKey]) {
              const field = this.availableData[groupKey].fields[fieldKey]
              if (field.value !== undefined) {
                if (!dataToLoad[groupKey]) dataToLoad[groupKey] = {}
                dataToLoad[groupKey][fieldKey] = field.value
              }
            }
          })
        })
        
        // Emit load event with selected data
        this.$emit('load', dataToLoad)
        
        // Close modal
        this.closeModal()
        
      } catch (error) {
        console.error('Failed to load profile data:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    closeModal() {
      this.showLoadModal = false
    },
    
    formatNumber(value) {
      if (typeof value !== 'number') return '0'
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Never'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    formatAssetLabel(key) {
      const labels = {
        cashChecking: 'Cash & Checking',
        highInterestSavings: 'High-Interest Savings',
        tfsa: 'TFSA',
        rrsp: 'RRSP',
        fhsa: 'FHSA',
        investments: 'Other Investments',
        otherAssets: 'Other Assets'
      }
      return labels[key] || key
    },
    
    formatLiabilityLabel(key) {
      const labels = {
        creditCards: 'Credit Cards',
        linesOfCredit: 'Lines of Credit',
        carLoans: 'Car Loans',
        studentLoans: 'Student Loans',
        otherDebts: 'Other Debts'
      }
      return labels[key] || key
    },
    
    formatExpenseLabel(key) {
      const labels = {
        rentMortgage: 'Rent/Mortgage',
        utilities: 'Utilities',
        internet: 'Internet',
        phone: 'Phone',
        insurance: 'Insurance',
        transitCar: 'Transit/Car',
        subscriptions: 'Subscriptions',
        minimumDebtPayments: 'Minimum Debt Payments'
      }
      return labels[key] || key
    },
    
    formatSavingsLabel(key) {
      const labels = {
        emergencyFund: 'Emergency Fund',
        homeFund: 'Home Fund',
        rrspFhsa: 'RRSP/FHSA'
      }
      return labels[key] || key
    }
  }
}
</script>

<style scoped>
.load-from-profile {
  position: relative;
}

.load-btn {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.load-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

.load-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Modal Styles */
.load-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.load-modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f8f9fa;
}

.modal-content {
  padding: 1.5rem;
}

.modal-description {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.data-selection h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.data-groups {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.data-group {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  background: #f8f9fa;
}

.group-header {
  margin-bottom: 1rem;
}

.group-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.25rem;
}

.group-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #6c757d;
  border-radius: 3px;
  position: relative;
  transition: all 0.2s;
}

.group-checkbox input[type="checkbox"]:checked + .checkmark {
  background: #007bff;
  border-color: #007bff;
}

.group-checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.data-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.data-item input[type="checkbox"] {
  display: none;
}

.data-item .checkmark {
  width: 16px;
  height: 16px;
}

.data-item input[type="checkbox"]:checked + .checkmark {
  background: #007bff;
  border-color: #007bff;
}

.field-label {
  flex: 1;
  color: #495057;
  font-weight: 500;
}

.field-value {
  color: #28a745;
  font-weight: 600;
  font-family: monospace;
}

/* Last Updated Info */
.last-updated {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dee2e6;
}

.last-updated h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.update-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.info-value {
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
  background: #f8f9fa;
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background: #5a6268;
}

.confirm-load-btn {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.confirm-load-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.confirm-load-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .load-modal {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .modal-content {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>
