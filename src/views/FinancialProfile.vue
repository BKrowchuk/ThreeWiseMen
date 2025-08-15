<template>
  <div class="financial-profile">
    <div class="page-header">
      <div class="header-content">
        <h1>Financial Profile</h1>
        <p>Manage your persistent financial data and track your financial progress</p>
      </div>
      <div class="header-navigation">
        <router-link to="/" class="back-link">← Back to Dashboard</router-link>
      </div>
    </div>

    <div class="profile-container">
      <!-- Profile Summary -->
      <div class="profile-summary">
        <div class="summary-header">
          <h2>Profile Overview</h2>
          <div class="summary-actions">
            <button @click="loadFromProfile" class="load-btn">
              📊 Load from Profile
            </button>
            <button @click="clearProfile" class="clear-btn">
              🗑️ Clear Profile
            </button>
          </div>
        </div>
        
        <div class="summary-grid">
          <div class="summary-card income">
            <h3>Monthly Income</h3>
            <div class="summary-value">${{ formatNumber(profileStore.financialState.monthlyIncome) }}</div>
            <div class="summary-meta">
              <span v-if="profileStore.lastUpdated.financialState">
                Updated: {{ formatDate(profileStore.lastUpdated.financialState) }}
              </span>
            </div>
          </div>
          
          <div class="summary-card savings">
            <h3>Total Savings</h3>
            <div class="summary-value">${{ formatNumber(totalSavings) }}</div>
            <div class="summary-meta">
              <span v-if="profileStore.lastUpdated.financialState">
                Updated: {{ formatDate(profileStore.lastUpdated.financialState) }}
              </span>
            </div>
          </div>
          
          <div class="summary-card net-worth">
            <h3>Net Worth</h3>
            <div class="summary-value">${{ formatNumber(totalNetWorth) }}</div>
            <div class="summary-meta">
              <span v-if="profileStore.lastUpdated.netWorth">
                Updated: {{ formatDate(profileStore.lastUpdated.netWorth) }}
              </span>
            </div>
          </div>
          
          <div class="summary-card goals">
            <h3>Monthly Savings Goal</h3>
            <div class="summary-value">${{ formatNumber(profileStore.financialState.goals.monthlySavingsGoal) }}</div>
            <div class="summary-meta">
              <span v-if="profileStore.lastUpdated.goals">
                Updated: {{ formatDate(profileStore.lastUpdated.goals) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Sections -->
      <div class="profile-sections">
        <!-- Income & Savings Section -->
        <div class="profile-section">
          <div class="section-header">
            <h3>Income & Savings</h3>
            <button @click="toggleEdit('income')" class="edit-btn">
              {{ editingSection === 'income' ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <div class="section-content">
            <div class="field-group">
              <label>Monthly Income</label>
              <div class="field-value">
                <span v-if="editingSection !== 'income'">${{ formatNumber(profileStore.financialState.monthlyIncome) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.monthlyIncome" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Existing Savings</label>
              <div class="field-value">
                <span v-if="editingSection !== 'income'">${{ formatNumber(profileStore.financialState.existingSavings) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.existingSavings" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Emergency Fund</label>
              <div class="field-value">
                <span v-if="editingSection !== 'income'">${{ formatNumber(profileStore.financialState.emergencyFund) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.emergencyFund" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Home Fund</label>
              <div class="field-value">
                <span v-if="editingSection !== 'income'">${{ formatNumber(profileStore.financialState.homeFund) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.homeFund" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>RRSP/FHSA</label>
              <div class="field-value">
                <span v-if="editingSection !== 'income'">${{ formatNumber(profileStore.financialState.rrspFhsa) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.rrspFhsa" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div v-if="editingSection === 'income'" class="edit-actions">
              <button @click="saveSection('income')" class="save-btn">Save Changes</button>
            </div>
          </div>
        </div>

        <!-- Assets Section -->
        <div class="profile-section">
          <div class="section-header">
            <h3>Assets</h3>
            <button @click="toggleEdit('assets')" class="edit-btn">
              {{ editingSection === 'assets' ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <div class="section-content">
            <div class="field-group">
              <label>Cash & Checking</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.cashChecking) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.cashChecking" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>High Interest Savings</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.highInterestSavings) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.highInterestSavings" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>TFSA</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.tfsa) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.tfsa" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>RRSP</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.rrsp) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.rrsp" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>FHSA</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.fhsa) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.fhsa" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Investments</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.investments) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.investments" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Other Assets</label>
              <div class="field-value">
                <span v-if="editingSection !== 'assets'">${{ formatNumber(profileStore.financialState.assets.otherAssets) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.assets.otherAssets" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div v-if="editingSection === 'assets'" class="edit-actions">
              <button @click="saveSection('assets')" class="save-btn">Save Changes</button>
            </div>
          </div>
        </div>

        <!-- Liabilities Section -->
        <div class="profile-section">
          <div class="section-header">
            <h3>Liabilities</h3>
            <button @click="toggleEdit('liabilities')" class="edit-btn">
              {{ editingSection === 'liabilities' ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <div class="section-content">
            <div class="field-group">
              <label>Credit Cards</label>
              <div class="field-value">
                <span v-if="editingSection !== 'liabilities'">${{ formatNumber(profileStore.financialState.liabilities.creditCards) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.liabilities.creditCards" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Lines of Credit</label>
              <div class="field-value">
                <span v-if="editingSection !== 'liabilities'">${{ formatNumber(profileStore.financialState.liabilities.linesOfCredit) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.liabilities.linesOfCredit" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Car Loans</label>
              <div class="field-value">
                <span v-if="editingSection !== 'liabilities'">${{ formatNumber(profileStore.financialState.liabilities.carLoans) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.liabilities.carLoans" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Student Loans</label>
              <div class="field-value">
                <span v-if="editingSection !== 'liabilities'">${{ formatNumber(profileStore.financialState.liabilities.studentLoans) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.liabilities.studentLoans" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Other Debts</label>
              <div class="field-value">
                <span v-if="editingSection !== 'liabilities'">${{ formatNumber(profileStore.financialState.liabilities.otherDebts) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.liabilities.otherDebts" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div v-if="editingSection === 'liabilities'" class="edit-actions">
              <button @click="saveSection('liabilities')" class="save-btn">Save Changes</button>
            </div>
          </div>
        </div>

        <!-- Financial Goals Section -->
        <div class="profile-section">
          <div class="section-header">
            <h3>Financial Goals</h3>
            <button @click="toggleEdit('goals')" class="edit-btn">
              {{ editingSection === 'goals' ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <div class="section-content">
            <div class="field-group">
              <label>Down Payment Target</label>
              <div class="field-value">
                <span v-if="editingSection !== 'goals'">${{ formatNumber(profileStore.financialState.goals.downPaymentTarget) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.goals.downPaymentTarget" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Monthly Savings Goal</label>
              <div class="field-value">
                <span v-if="editingSection !== 'goals'">${{ formatNumber(profileStore.financialState.goals.monthlySavingsGoal) }}</span>
                <input 
                  v-else 
                  v-model.number="editData.goals.monthlySavingsGoal" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div class="field-group">
              <label>Target Timeline (months)</label>
              <div class="field-value">
                <span v-if="editingSection !== 'goals'">{{ profileStore.financialState.goals.targetTimeline }}</span>
                <input 
                  v-else 
                  v-model.number="editData.goals.targetTimeline" 
                  type="number" 
                  class="edit-input"
                />
              </div>
            </div>
            
            <div v-if="editingSection === 'goals'" class="edit-actions">
              <button @click="saveSection('goals')" class="save-btn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Historical Data -->
      <div class="historical-data" v-if="hasHistoricalData">
        <h2>Historical Data</h2>
        
        <!-- Net Worth History -->
        <div class="history-section" v-if="profileStore.netWorthHistory.length > 0">
          <h3>Net Worth History</h3>
          <div class="history-chart">
            <div class="chart-placeholder">
              📊 Net Worth tracking over time ({{ profileStore.netWorthHistory.length }} snapshots)
            </div>
            <div class="history-list">
              <div 
                v-for="(snapshot, index) in profileStore.netWorthHistory.slice(-6)" 
                :key="index"
                class="history-item"
              >
                <span class="history-date">{{ formatDate(snapshot.timestamp) }}</span>
                <span class="history-value">${{ formatNumber(snapshot.totalNetWorth) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Cash Flow History -->
        <div class="history-section" v-if="profileStore.cashFlowHistory.length > 0">
          <h3>Cash Flow History</h3>
          <div class="history-chart">
            <div class="chart-placeholder">
              💰 Cash Flow tracking over time ({{ profileStore.cashFlowHistory.length }} snapshots)
            </div>
            <div class="history-list">
              <div 
                v-for="(snapshot, index) in profileStore.cashFlowHistory.slice(-6)" 
                :key="index"
                class="history-item"
              >
                <span class="history-date">{{ formatDate(snapshot.timestamp) }}</span>
                <span class="history-value">${{ formatNumber(snapshot.totalCashFlow) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profileStore, profileActions } from '../store/profile'

export default {
  name: 'FinancialProfile',
  
  data() {
    return {
      editingSection: null,
      editData: {
        monthlyIncome: 0,
        existingSavings: 0,
        emergencyFund: 0,
        homeFund: 0,
        rrspFhsa: 0,
        assets: {
          cashChecking: 0,
          highInterestSavings: 0,
          tfsa: 0,
          rrsp: 0,
          fhsa: 0,
          investments: 0,
          otherAssets: 0
        },
        liabilities: {
          creditCards: 0,
          linesOfCredit: 0,
          carLoans: 0,
          studentLoans: 0,
          otherDebts: 0
        },
        goals: {
          downPaymentTarget: 0,
          monthlySavingsGoal: 0,
          targetTimeline: 0
        }
      }
    }
  },
  
  computed: {
    totalSavings() {
      return (
        profileStore.financialState.existingSavings +
        profileStore.financialState.emergencyFund +
        profileStore.financialState.homeFund +
        profileStore.financialState.rrspFhsa
      )
    },
    
    totalNetWorth() {
      const totalAssets = Object.values(profileStore.financialState.assets).reduce((sum, value) => sum + value, 0)
      const totalLiabilities = Object.values(profileStore.financialState.liabilities).reduce((sum, value) => sum + value, 0)
      return totalAssets - totalLiabilities
    },
    
    hasHistoricalData() {
      return profileStore.netWorthHistory.length > 0 || profileStore.cashFlowHistory.length > 0
    }
  },
  
  methods: {
    toggleEdit(section) {
      if (this.editingSection === section) {
        this.editingSection = null
        this.resetEditData()
      } else {
        this.editingSection = section
        this.loadEditData(section)
      }
    },
    
    loadEditData(section) {
      switch (section) {
        case 'income':
          this.editData.monthlyIncome = profileStore.financialState.monthlyIncome
          this.editData.existingSavings = profileStore.financialState.existingSavings
          this.editData.emergencyFund = profileStore.financialState.emergencyFund
          this.editData.homeFund = profileStore.financialState.homeFund
          this.editData.rrspFhsa = profileStore.financialState.rrspFhsa
          break
        case 'assets':
          Object.assign(this.editData.assets, profileStore.financialState.assets)
          break
        case 'liabilities':
          Object.assign(this.editData.liabilities, profileStore.financialState.liabilities)
          break
        case 'goals':
          Object.assign(this.editData.goals, profileStore.financialState.goals)
          break
      }
    },
    
    resetEditData() {
      this.editData = {
        monthlyIncome: 0,
        existingSavings: 0,
        emergencyFund: 0,
        homeFund: 0,
        rrspFhsa: 0,
        assets: {
          cashChecking: 0,
          highInterestSavings: 0,
          tfsa: 0,
          rrsp: 0,
          fhsa: 0,
          investments: 0,
          otherAssets: 0
        },
        liabilities: {
          creditCards: 0,
          linesOfCredit: 0,
          carLoans: 0,
          studentLoans: 0,
          otherDebts: 0
        },
        goals: {
          downPaymentTarget: 0,
          monthlySavingsGoal: 0,
          targetTimeline: 0
        }
      }
    },
    
    saveSection(section) {
      switch (section) {
        case 'income':
          profileActions.updateProfileField('monthlyIncome', this.editData.monthlyIncome)
          profileActions.updateProfileField('existingSavings', this.editData.existingSavings)
          profileActions.updateProfileField('emergencyFund', this.editData.emergencyFund)
          profileActions.updateProfileField('homeFund', this.editData.homeFund)
          profileActions.updateProfileField('rrspFhsa', this.editData.rrspFhsa)
          break
        case 'assets':
          Object.keys(this.editData.assets).forEach(key => {
            profileActions.updateProfileField(`assets.${key}`, this.editData.assets[key])
          })
          break
        case 'liabilities':
          Object.keys(this.editData.liabilities).forEach(key => {
            profileActions.updateProfileField(`liabilities.${key}`, this.editData.liabilities[key])
          })
          break
        case 'goals':
          Object.keys(this.editData.goals).forEach(key => {
            profileActions.updateProfileField(`goals.${key}`, this.editData.goals[key])
          })
          break
      }
      
      this.editingSection = null
      this.resetEditData()
    },
    
    loadFromProfile() {
      // This could be used to populate calculator fields
      // For now, just show a message
      alert('Profile data can be used to pre-populate calculator fields. This feature will be implemented in the calculator components.')
    },
    
    clearProfile() {
      if (confirm('Are you sure you want to clear all profile data? This action cannot be undone.')) {
        profileActions.clearProfileData()
      }
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
    }
  }
}
</script>

<style scoped>
.financial-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e1e8ed;
}

.header-content h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.header-content p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background: #f8f9fa;
  color: #5a6fd8;
}

/* Profile Summary */
.profile-summary {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.summary-header h2 {
  color: #2c3e50;
  margin: 0;
}

.summary-actions {
  display: flex;
  gap: 1rem;
}

.load-btn, .clear-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.load-btn {
  background: #007bff;
  color: white;
}

.load-btn:hover {
  background: #0056b3;
}

.clear-btn {
  background: #dc3545;
  color: white;
}

.clear-btn:hover {
  background: #c82333;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid;
}

.summary-card.income {
  background: #f8f9fa;
  border-left-color: #28a745;
}

.summary-card.savings {
  background: #f8f9fa;
  border-left-color: #17a2b8;
}

.summary-card.net-worth {
  background: #f8f9fa;
  border-left-color: #ffc107;
}

.summary-card.goals {
  background: #f8f9fa;
  border-left-color: #6f42c1;
}

.summary-card h3 {
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.summary-meta {
  font-size: 0.85rem;
  color: #6c757d;
}

/* Profile Sections */
.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e1e8ed;
}

.section-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.3rem;
}

.edit-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background: #5a6268;
}

.section-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-group label {
  color: #495057;
  font-weight: 500;
  font-size: 0.9rem;
}

.field-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
}

.edit-input {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

.edit-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.25);
}

.edit-actions {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 1rem;
}

.save-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.save-btn:hover {
  background: #218838;
  transform: translateY(-1px);
}

/* Historical Data */
.historical-data {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.historical-data h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.history-section {
  margin-bottom: 2rem;
}

.history-section h3 {
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.history-chart {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.chart-placeholder {
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding: 2rem;
  background: white;
  border-radius: 6px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #667eea;
}

.history-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.history-value {
  color: #2c3e50;
  font-weight: 600;
  font-family: monospace;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .financial-profile {
    padding: 1.5rem;
  }
  
  .summary-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .section-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .financial-profile {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .summary-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .summary-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-section {
    padding: 1.5rem;
  }
}
</style>
