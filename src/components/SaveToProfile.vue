<template>
  <div class="save-to-profile">
    <!-- Save Button -->
    <div class="save-section" v-if="showSaveButton">
      <button 
        @click="openSaveModal" 
        class="save-btn"
        :disabled="isSaving"
      >
        <span v-if="!isSaving">💾 Save to Profile</span>
        <span v-else>Saving...</span>
      </button>
      <p class="save-hint">Save these results to your persistent financial profile</p>
    </div>

    <!-- Save Modal -->
    <div class="save-modal-overlay" v-if="showModal" @click="closeModal">
      <div class="save-modal" @click.stop>
        <div class="modal-header">
          <h3>Save to Financial Profile</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-content">
          <p class="modal-description">
            Select which calculated values you'd like to save to your financial profile. 
            This data will persist across sessions and can be used to pre-populate future calculations.
          </p>
          
          <!-- Field Selection -->
          <div class="field-selection">
            <h4>Select Fields to Save:</h4>
            
            <div class="field-groups">
              <div 
                v-for="(group, groupKey) in saveableFields" 
                :key="groupKey" 
                class="field-group"
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
                
                <div class="field-items">
                  <label 
                    v-for="(field, fieldKey) in group.fields" 
                    :key="fieldKey"
                    class="field-item"
                  >
                    <input 
                      type="checkbox" 
                      v-model="selectedFields[groupKey][fieldKey]"
                      @change="updateGroupSelection(groupKey)"
                    />
                    <span class="checkmark"></span>
                    <span class="field-label">{{ field.label }}</span>
                    <span class="field-value">${{ formatNumber(field.value) }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Profile Comparison -->
          <div class="profile-comparison" v-if="hasProfileData">
            <h4>Profile Comparison:</h4>
            <div class="comparison-grid">
              <div 
                v-for="(group, groupKey) in saveableFields" 
                :key="groupKey"
                class="comparison-group"
              >
                <h5>{{ group.title }}</h5>
                <div class="comparison-items">
                  <div 
                    v-for="(field, fieldKey) in group.fields" 
                    :key="fieldKey"
                    class="comparison-item"
                  >
                    <span class="field-name">{{ field.label }}:</span>
                    <div class="value-comparison">
                      <span class="profile-value">${{ formatNumber(profileValues[groupKey]?.[fieldKey] || 0) }}</span>
                      <span class="arrow">→</span>
                      <span class="new-value">${{ formatNumber(field.value) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">Cancel</button>
          <button 
            @click="saveToProfile" 
            class="confirm-save-btn"
            :disabled="!hasSelectedFields || isSaving"
          >
            <span v-if="!isSaving">Save Selected Fields</span>
            <span v-else>Saving...</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Success Message -->
    <div class="success-message" v-if="showSuccess">
      <div class="success-content">
        <span class="success-icon">✅</span>
        <div class="success-text">
          <h4>Successfully Saved!</h4>
          <p>{{ successMessage }}</p>
        </div>
        <button @click="hideSuccess" class="close-success">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { profileActions } from '../store/profile'

export default {
  name: 'SaveToProfile',
  props: {
    calculatorType: {
      type: String,
      required: true,
      validator: value => ['downPayment', 'netWorth', 'cashFlow'].includes(value)
    },
    calculatedData: {
      type: Object,
      required: true
    },
    showSaveButton: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      showModal: false,
      isSaving: false,
      showSuccess: false,
      successMessage: '',
      selectedFields: {},
      saveableFields: {}
    }
  },
  
  computed: {
    hasProfileData() {
      return profileActions.hasProfileData(this.calculatorType)
    },
    
    profileValues() {
      return profileActions.getProfileComparison(this.calculatorType)
    },
    
    hasSelectedFields() {
      return Object.values(this.selectedFields).some(group => 
        Object.values(group).some(selected => selected)
      )
    }
  },
  
  watch: {
    calculatedData: {
      handler() {
        this.initializeSaveableFields()
      },
      immediate: true
    }
  },
  
  methods: {
    initializeSaveableFields() {
      switch (this.calculatorType) {
        case 'downPayment':
          this.saveableFields = {
            income: {
              title: 'Income',
              description: 'Your monthly income information',
              fields: {
                monthlyIncome: {
                  label: 'Monthly Income',
                  value: this.calculatedData.monthlyIncome || 0
                }
              }
            },
            savings: {
              title: 'Savings',
              description: 'Your current savings and targets',
              fields: {
                existingSavings: {
                  label: 'Existing Savings',
                  value: this.calculatedData.existingSavings || 0
                }
              }
            },
            goals: {
              title: 'Financial Goals',
              description: 'Your home purchase goals',
              fields: {
                downPaymentTarget: {
                  label: 'Down Payment Target',
                  value: this.calculatedData.downPaymentTarget || 0
                },
                monthlySavingsGoal: {
                  label: 'Monthly Savings Goal',
                  value: this.calculatedData.monthlySavingsGoal || 0
                }
              }
            }
          }
          break
          
        case 'netWorth':
          this.saveableFields = {
            assets: {
              title: 'Assets',
              description: 'Your current asset values',
              fields: this.calculatedData.assets || {}
            },
            liabilities: {
              title: 'Liabilities',
              description: 'Your current debt amounts',
              fields: this.calculatedData.liabilities || {}
            }
          }
          break
          
        case 'cashFlow':
          this.saveableFields = {
            income: {
              title: 'Income',
              description: 'Your monthly income',
              fields: {
                monthlyIncome: {
                  label: 'Monthly Income',
                  value: this.calculatedData.income?.monthlyIncome || 0
                }
              }
            },
            fixedExpenses: {
              title: 'Fixed Expenses',
              description: 'Your recurring monthly expenses',
              fields: this.calculatedData.fixedExpenses || {}
            },
            variableExpenses: {
              title: 'Variable Expenses',
              description: 'Your flexible monthly expenses',
              fields: this.calculatedData.variableExpenses || {}
            },
            savings: {
              title: 'Savings Targets',
              description: 'Your monthly savings goals',
              fields: this.calculatedData.savings || {}
            }
          }
          break
      }
      
      // Initialize selected fields
      this.selectedFields = {}
      Object.keys(this.saveableFields).forEach(groupKey => {
        this.selectedFields[groupKey] = {}
        Object.keys(this.saveableFields[groupKey].fields).forEach(fieldKey => {
          this.selectedFields[groupKey][fieldKey] = true
        })
      })
    },
    
    openSaveModal() {
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
    },
    
    toggleGroup(groupKey) {
      const isSelected = this.isGroupSelected(groupKey)
      Object.keys(this.selectedFields[groupKey]).forEach(fieldKey => {
        this.selectedFields[groupKey][fieldKey] = !isSelected
      })
    },
    
    isGroupSelected(groupKey) {
      return Object.values(this.selectedFields[groupKey]).every(selected => selected)
    },
    
    updateGroupSelection(groupKey) {
      // This method is called when individual fields change
      // Group selection logic is handled by isGroupSelected computed property
    },
    
    async saveToProfile() {
      this.isSaving = true
      
      try {
        // Prepare data to save based on selected fields
        const dataToSave = {}
        
        Object.keys(this.selectedFields).forEach(groupKey => {
          Object.keys(this.selectedFields[groupKey]).forEach(fieldKey => {
            if (this.selectedFields[groupKey][fieldKey]) {
              const field = this.saveableFields[groupKey].fields[fieldKey]
              if (field.value !== undefined) {
                if (!dataToSave[groupKey]) dataToSave[groupKey] = {}
                dataToSave[groupKey][fieldKey] = field.value
              }
            }
          })
        })
        
        // Save to profile based on calculator type
        switch (this.calculatorType) {
          case 'downPayment':
            profileActions.saveDownPaymentData({
              monthlyIncome: dataToSave.income?.monthlyIncome,
              existingSavings: dataToSave.savings?.existingSavings,
              downPaymentTarget: dataToSave.goals?.downPaymentTarget,
              monthlySavingsGoal: dataToSave.goals?.monthlySavingsGoal,
              timeline: this.calculatedData.timeline
            })
            break
            
          case 'netWorth':
            profileActions.saveNetWorthData({
              assets: dataToSave.assets,
              liabilities: dataToSave.liabilities,
              totalNetWorth: this.calculatedData.totalNetWorth
            })
            break
            
          case 'cashFlow':
            profileActions.saveCashFlowData({
              income: dataToSave.income,
              fixedExpenses: dataToSave.fixedExpenses,
              variableExpenses: dataToSave.variableExpenses,
              savings: dataToSave.savings,
              totalCashFlow: this.calculatedData.totalCashFlow
            })
            break
        }
        
        // Show success message
        this.successMessage = this.generateSuccessMessage(dataToSave)
        this.showSuccess = true
        this.closeModal()
        
        // Emit save event
        this.$emit('saved', dataToSave)
        
      } catch (error) {
        console.error('Failed to save to profile:', error)
        // Could add error handling here
      } finally {
        this.isSaving = false
      }
    },
    
    generateSuccessMessage(dataToSave) {
      const savedCount = Object.values(dataToSave).reduce((total, group) => 
        total + Object.keys(group).length, 0
      )
      
      return `Successfully saved ${savedCount} field${savedCount !== 1 ? 's' : ''} to your financial profile.`
    },
    
    hideSuccess() {
      this.showSuccess = false
    },
    
    formatNumber(value) {
      if (typeof value !== 'number') return '0'
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    }
  }
}
</script>

<style scoped>
.save-to-profile {
  position: relative;
}

.save-section {
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 2px solid #dee2e6;
}

.save-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.save-hint {
  margin-top: 0.75rem;
  color: #6c757d;
  font-size: 0.9rem;
}

/* Modal Styles */
.save-modal-overlay {
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

.save-modal {
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

.field-selection h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.field-groups {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
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
  background: #28a745;
  border-color: #28a745;
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

.field-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.field-item input[type="checkbox"] {
  display: none;
}

.field-item .checkmark {
  width: 16px;
  height: 16px;
}

.field-item input[type="checkbox"]:checked + .checkmark {
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

/* Profile Comparison */
.profile-comparison {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dee2e6;
}

.profile-comparison h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.comparison-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-group h5 {
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.comparison-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comparison-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.field-name {
  color: #6c757d;
  font-size: 0.9rem;
}

.value-comparison {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.profile-value {
  color: #6c757d;
  text-decoration: line-through;
}

.arrow {
  color: #007bff;
  font-weight: bold;
}

.new-value {
  color: #28a745;
  font-weight: 600;
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

.confirm-save-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.confirm-save-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.confirm-save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Success Message */
.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  animation: slideIn 0.3s ease-out;
}

.success-content {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 1.2rem;
}

.success-text h4 {
  margin: 0 0 0.25rem 0;
  color: #155724;
  font-size: 1rem;
}

.success-text p {
  margin: 0;
  color: #155724;
  font-size: 0.9rem;
}

.close-success {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #155724;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-success:hover {
  background-color: #c3e6cb;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .save-modal {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .modal-content {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .success-message {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
</style>
